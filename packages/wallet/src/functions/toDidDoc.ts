import base64url from 'base64url';

import { UNIVERSAL_WALLET_CONTEXT_URL, placeHolderImage } from '../constants';

import { getCreateOperation } from './getCreateOperation';
import { toKeyPair } from './toKeyPair';

import { DidDocument } from '../types';
import { hashThenEncode } from './sidetreeEncoding';

export const toDidDoc = async (
  mnemonic: string,
  index: number,
  didMethodName: string
): Promise<DidDocument> => {
  const first_key = await toKeyPair(mnemonic, index, 'secp256k1');
  const createOperation = await getCreateOperation(mnemonic, index);

  const didUniqueSuffix = hashThenEncode(
    base64url.toBuffer(createOperation.suffix_data)
  );
  const shortFormDid = `did:${didMethodName}:${didUniqueSuffix}`;

  const longFormDid = `${shortFormDid}?-${
    didMethodName.split(':')[0]
  }-initial-state=${createOperation.suffix_data}.${createOperation.delta}`;

  const didDocument = {
    '@context': [
      'https://www.w3.org/ns/did/v1',
      {
        '@base': shortFormDid,
      },
    ],
    id: shortFormDid,
    publicKey: [
      {
        id: '#' + first_key.id.split('#').pop(),
        type: 'JsonWebKey2020',
        controller: shortFormDid,
        publicKeyJwk: first_key.publicKeyJwk,
      },
    ],
    authentication: ['#' + first_key.id.split('#').pop()],
  };

  return {
    '@context': [UNIVERSAL_WALLET_CONTEXT_URL],
    id: longFormDid,
    name: 'Sidetree DID',
    image: placeHolderImage,
    description: 'Generated by @sidetree/wallet.',
    tags: [],
    type: 'DID',
    didDocument,
  };
};