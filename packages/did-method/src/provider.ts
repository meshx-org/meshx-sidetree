import { MockCas } from '@sidetree/cas'
import { MockLedger } from '@sidetree/ledger'

import sidetreeTestNodeCoreVersions from './configs/sidetree-test-node-core-versions.json'
import Core from './Core'
import { ConsoleLogger } from '@sidetree/common'

interface TestNodeConfig {
    batchingIntervalInSeconds: number
    blockchainServiceUri: string
    observingIntervalInSeconds: number
    mongoDbConnectionString: string
    databaseName: string
    didMethodName: string
    maxConcurrentDownloads: number
    port: number
}

export const getTestNodeIntance = async (sideTreeNodeCoreConfig: TestNodeConfig) => {
    const cas = new MockCas()
    await cas.initialize()

    const ledger = new MockLedger()

    const instance = new Core(sideTreeNodeCoreConfig, sidetreeTestNodeCoreVersions as any, cas, ledger)
    await instance.initialize(new ConsoleLogger())

    return instance
}
