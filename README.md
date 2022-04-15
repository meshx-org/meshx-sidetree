<!--
parent:
  order: false
-->

<div align="center">
  <h1>MeshX Sidetree</h1>
</div>

<!-- Header -->
<p align="center">
    <img src="./docs/images/meshx-sidetree-header.png" alt="MeshX Sidetree">
</p>

<!-- Badges -->

<div align="center">

![GitHub package.json version (subfolder of monorepo)](https://img.shields.io/github/package-json/v/meshx-org/meshx-sidetree?filename=packages%2Fcore%2Fpackage.json)
[![Blazing Fast](https://badgen.now.sh/badge/speed/blazing%20%F0%9F%94%A5/green)](https://npm.im/tsdx)
[![Continuous Integration](https://github.com/meshx-org/meshx-sidetree/workflows/CI/badge.svg)](https://github.com/meshx-org/meshx-sidetree/actions/workflows/ci.yml)
![Lines of code](https://img.shields.io/tokei/lines/github/meshx-org/meshx-sidetree)
[![License: Apache-2.0](https://img.shields.io/github/license/meshx-org/sidetree-sdk)](https://opensource.org/licenses/Apache-2.0)

</div>

---

## Welcome!

MeshX Sidetree is an open source fork of [Sidetree.js](https://github.com/transmute-industries/sidetree.js) by Transmute Industries.

### What is MeshX Sidetree

MeshX Sidetree is a simple-as-possible TypeScript implementation of the Sidetree version
1.0 protocol. The purpose of the Sidetree protocol is to create a blockchain based
public key infrastructure, where rather than having a central authority that can
accept or revoke keys, by having the blockchain act as a whitness for regestering
public keys, anyone can publish a public key that can be used to establish identity.

### How Does MeshX Sidetree Work?

The Sidetree protocol describes using a Content Addressable Storage and a Ledger
to establish a public key infrastructure. What this boils down to is that public keys
are stored in a Content Addressable Storage, and pointers to that storage are published
on a Ledger.

The simpliest possible example of this would be an public FTP server, where anyone could
upload a public key and a identifier for that public key. In practice, this sets up a
central authority and a single point of failure. In practice we use a public ledger
such as Bitcoin or Ehtereum. And we use IPFS as a Content Addressable Storage to
create Decentralized Identitifiers for Public Keys.

However since the interfaces for what needs to be implemented is flexible, we can also
implement DID methods such as Photon which uses Amazon QLDB for a ledger, and Amazon S3
for content addressable storage.

<!-- 
## Public MeshX Sidetree Nodes

- https://ropsten.element.meshx.co/
- https://element.shellshop.lol/ 
-->

<!--## Project Resources

[TBD]

- [Project Website](https://opensearch.org/)
- [Downloads](https://opensearch.org/downloads.html)
- [Documentation](https://opensearch.org/docs/)
- Need help? Try [Forums](https://discuss.opendistrocommunity.dev/)
- [Project Principles](https://opensearch.org/#principles)
- [Contributing to OpenSearch](CONTRIBUTING.md)
- [Maintainer Responsibilities](MAINTAINERS.md)
- [Admin Responsibilities](ADMINS.md)
- [Release Management](RELEASING.md)
- [Testing](TESTING.md)
- [Security](SECURITY.md)
-->

## Developers Guide

See [Development](./DEVELOPMENT.md)

<!--
## Commercial Support

Commercial support for these libraries is available upon request from MeshX: [support@meshx.co](mailto:support@meshx.co)
-->

## Code of Conduct

This project has adopted the [Contributor Covenant Code of Conduct v2.1](CODE_OF_CONDUCT.md). For more information see the [Code of Conduct FAQ](https://www.contributor-covenant.org/faq), or contact [opensource@meshx.co](mailto:opensource@meshx.co) with any additional questions or comments.

## Security Policy

Please see our [security policy](./SECURITY.md) for additional details about responsible disclosure of security related issues.

## License

This project is licensed under the [Apache v2.0 License](LICENSE.txt).

## Copyright

Copyright MeshX Sidetree Contributors. See [NOTICE](NOTICE.txt) for details.

<!--
## Trademark

MeshX Sidetree is a registered trademark of Amazon Web Services.

MeshX Sidetree includes certain Apache-licensed Elasticsearch code from Elasticsearch B.V. and other source code. Elasticsearch B.V. is not the source of that other source code. ELASTICSEARCH is a registered trademark of Elasticsearch B.V.
-->
