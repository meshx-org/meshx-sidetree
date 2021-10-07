# Developers Guide

This codebase is a [Lerna monorepo](https://github.com/lerna/lerna).

For a list of all modules in this repository, see [packages](https://github.com/transmute-industries/sidetree.js/tree/main/packages).

See [Contributing](./CONTRIBUTING.md).

## Usage

To install all packages run

```bash
npm install
```

To install a specific package (and its dependencies) run

```bash
npm run install:only @sidetree/photon
```

To run tests in every packages run

```bash
npm run test
```

To test a specific package run

```bash
npm run test:only @sidetree/photon
```

## Services

We use docker-compose to setup the services used in tests, Namely:

- ganache: for a local ethereum testnet
- ipfs: for a local ipfs node
- mongodb: for a local mongo DB

Make sure you have `docker` and `docker-compose` installed before running the tests

## How to pull individual packages from the mono repo

- Copy the global eslint config to the package
- Make sure the linked packages are published

## Release process

### Unstable releases

Unstable releases are automatic, from CD:

- On every commit to main an unstable release is pushed. An unstable release is a release with a tag of the form: vA.B.C-unstable.X. Everytime a PR is merged, X is incremented.
- If "skip-ci" is present in the commit message, the aforementioned behavior is skipped

### Stable releases

Stable releases are triggered by a dev locally

- Make sure you are familiar with [Semantic Versioning](https://semver.org/)
- Run `npm install` and `npm build` in the root level directory
- Run
  - `npm run publish:stable:patch` for a patch version increment
  - `npm run publish:stable:minor` for a minor version increment
  - `npm run publish:stable:major` for a major version increment

### Example

- Current version is v0.1.0
- A PR is made to fix bug A. When it's merged a release is made: v0.1.0-unstable-0
- A PR is made to add feature B. When it's merged a release is made: v0.1.0-unstable-1
- A PR is made to add feature C. When it's merged a release is made: v0.1.0-unstable-2
- Dev runs `npm run publish:stable:patch`. Current version is v0.1.0
- A PR is made to fix bug D. When it's merged a release is made: v0.1.1-unstable-0
- etc...

### Docker Commands

You may find it useful to prune all docker data:

```
docker system prune
```