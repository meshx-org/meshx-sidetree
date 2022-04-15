ARG NODE_VERSION=16
ARG SERVICE
ARG NODE_AUTH_TOKEN  

###################################################################
# Stage 1: Install dependencies only when needed
###################################################################
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /workspace-install
ARG SERVICE
ARG NODE_AUTH_TOKEN  

ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat rsync

COPY package.json package-lock.json lerna.json ./
COPY packages/${SERVICE}/package.json packages/${SERVICE}/package-lock.json ./packages/${SERVICE}/
COPY packages/${SERVICE}/src ./packages/${SERVICE}/src

#
# To speed up installations, we override the default npm cache folder
# and mount it as a buildkit cache mount (builkit will rotate it if needed)
# This strategy allows to exclude the npm cache in subsequent docker
# layers (size benefit) and reduce packages fetches.
#
# PS:
#  1. Cache mounts can be used in CI (github actions)
#  2. To manually clear the cache
#     > docker builder prune --filter type=exec.cachemount
#
# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673

RUN --mount=type=cache,target=/root/.npm,id=npm-cache \
    npm set cache /root/.npm && \
    npm ci


###################################################################
# Stage 2: Rebuild the source code only when needed
###################################################################
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
ARG SERVICE
ARG NODE_AUTH_TOKEN  

ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN
ENV NODE_ENV=production

COPY . .
COPY --from=deps /workspace-install ./

# Does not play well with buildkit on CI
# https://github.com/moby/buildkit/issues/1673
#RUN --mount=type=cache,target=/root/.yarn,id=yarn-cache \
#    SKIP_POSTINSTALL=1 \
#    YARN_CACHE_FOLDER=/root/.yarn \
#    yarn workspaces focus @meshx-org/$SERVICE --production

WORKDIR /app/packages/$SERVICE
RUN npm run build

###################################################################
# Stage 3a (Optional): Develop only image
###################################################################

FROM node:${NODE_VERSION}-alpine AS development
WORKDIR /app
ARG SERVICE
ARG NODE_AUTH_TOKEN

ENV NODE_AUTH_TOKEN=$NODE_AUTH_TOKEN
ENV NODE_ENV=development

COPY --from=deps /workspace-install ./

WORKDIR /app/packages/$SERVICE

CMD npm run start:dev

###################################################################
# Stage 3b: Production image, copy all the files and run the server
###################################################################
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /app
ARG SERVICE
ARG NODE_AUTH_TOKEN  

ENV NODE_ENV production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/packages/$SERVICE/dist ./packages/$SERVICE/dist
COPY --from=builder /app/packages/$SERVICE/node_modules ./packages/$SERVICE/node_modules
COPY --from=builder /app/packages/$SERVICE/package.json ./packages/$SERVICE/package.json

WORKDIR /app/packages/$SERVICE

CMD npm run start