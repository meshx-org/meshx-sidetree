import { fastify } from 'fastify';

import { getTestNodeIntance as getTestNodeInstance } from '@sidetree/did-method';

const config = {
  databaseName: 'test-mongodb',
  mongoDbConnectionString: 'mongodb://localhost:27017/',
  blockchainServiceUri: '',
  didMethodName: 'example:sidetree.testnet',
  batchingIntervalInSeconds: 5,
  observingIntervalInSeconds: 5,
  maxConcurrentDownloads: 20,
};

export const convertSidetreeStatusToHttpStatus = (status: string) => {
  if (status === 'succeeded') {
    return 200;
  }
  return 500;
};

async function main() {
  const sidetree = await getTestNodeInstance(config as any);
  const app = fastify();

  app.get('/1.0/version', async (req, reply) => {
    const { body, status } = await sidetree.handleGetVersionRequest();

    reply.type('application/json')
    reply.send(body);
    reply.status(convertSidetreeStatusToHttpStatus(status));
  });

  app.get('/1.0/identifiers/:did', async (req, reply) => {
    const { did } = req.params as any;
    const { body, status } = await sidetree.handleResolveRequest(did);

    reply.type('application/json')
    reply.send(body);
    reply.status(convertSidetreeStatusToHttpStatus(status));
  });

  app.get('/1.0/operations', async (req, reply) => {
    const didUniqueSuffix = (req.query as Record<string, string>)['did-unique-suffix'];
    const result: any = await sidetree.getOperations(didUniqueSuffix);

    const operations = result.operations.map((op: any) => {
      return JSON.parse(op.operationBuffer.toString());
    });

    reply.type('application/json')
    reply.status(200);
    reply.send({ operations });
  });

  app.post('/1.0/operations', async (req, reply) => {
    let requestBody = req.body as string;

    if (typeof requestBody === 'object') {
      requestBody = JSON.stringify(req.body);
    }
    const operation = Buffer.from(requestBody);

    const { body, status } = await sidetree.handleOperationRequest(operation);

    reply.type('application/json')
    reply.send(body);
    reply.status(convertSidetreeStatusToHttpStatus(status));
  });

  app.listen(3000, '0.0.0.0', () => console.log('server is running'));
}

main();
export {};
