import { MockCas } from '@sidetree/cas';

import { MockLedger } from '@sidetree/ledger';

import sidetreeTestNodeCoreVersions from './configs/sidetree-test-node-core-versions.json';
import Core from './Core';
import { ConsoleLogger } from '@sidetree/common';

export const getTestNodeIntance = async (sideTreeNodeCoreConfig: {
  batchingIntervalInSeconds: number;
  blockchainServiceUri: string;
  observingIntervalInSeconds: number;
  mongoDbConnectionString: string;
  databaseName: string;
  didMethodName: string;
  maxConcurrentDownloads: number;
}) => {
  const cas: any = new MockCas();
  await cas.initialize();
  const ledger: any = new MockLedger();
  const sidetreeNodeInstance = new Core(sideTreeNodeCoreConfig, sidetreeTestNodeCoreVersions as any, cas, ledger);
  await sidetreeNodeInstance.initialize(new ConsoleLogger());
  return sidetreeNodeInstance;
};
