import { ethers } from 'ethers';

const eip712Fee = {
  name: 'Fee',
  fields: [
    { name: 'rate', type: 'uint16' },
    { name: 'recipient', type: 'address' },
  ],
};

const eip712Order = {
  name: 'Order',
  fields: [
    { name: 'trader', type: 'address' },
    { name: 'side', type: 'uint8' },
    { name: 'matchingPolicy', type: 'address' },
    { name: 'collection', type: 'address' },
    { name: 'tokenId', type: 'uint256' },
    { name: 'amount', type: 'uint256' },
    { name: 'paymentToken', type: 'address' },
    { name: 'price', type: 'uint256' },
    { name: 'listingTime', type: 'uint256' },
    { name: 'expirationTime', type: 'uint256' },
    { name: 'fees', type: 'Fee[]' },
    { name: 'salt', type: 'uint256' },
    { name: 'extraParams', type: 'bytes' },
    { name: 'nonce', type: 'uint256' },
  ],
};

const eip712OracleOrder = {
  name: 'OracleOrder',
  fields: [
    { name: 'order', type: 'Order' },
    { name: 'blockNumber', type: 'uint256' },
  ],
};

function structToSign(order, exchange) {
  return {
    name: eip712Order.name,
    fields: eip712Order.fields,
    domain: {
      name: 'Blur Exchange',
      version: '1.0',
      chainId: 1,
      verifyingContract: exchange,
    },
    data: order,
  };
}

export async function oracleSign(order, account, exchange, blockNumber) {
  const nonce = await exchange.nonces(order.trader);
  const str = structToSign({ ...order, nonce }, exchange.address);
  return account
    ._signTypedData(
      str.domain,
      {
        [eip712Fee.name]: eip712Fee.fields,
        [eip712Order.name]: eip712Order.fields,
        [eip712OracleOrder.name]: eip712OracleOrder.fields,
      },
      { order: str.data, blockNumber }
    )
    .then((sigBytes) => {
      const sig = ethers.utils.splitSignature(sigBytes);
      return sig;
    });
}

export async function sign(order, account, exchange) {
  const nonce = await exchange.nonces(order.trader);
  console.log('nonce', nonce);
  const str = structToSign({ ...order, nonce }, exchange.address);
  return false;
  return account
    ._signTypedData(
      str.domain,
      {
        [eip712Fee.name]: eip712Fee.fields,
        [eip712Order.name]: eip712Order.fields,
      },
      str.data
    )
    .then(async (sigBytes) => {
      const sig = ethers.utils.splitSignature(sigBytes);

      console.log('sig', sig);
      return sig;
    });
}

export function packSignature(signature) {
  return ethers.utils.defaultAbiCoder.encode(
    ['uint8', 'bytes32', 'bytes32'],
    [signature.v, signature.r, signature.s]
  );
}
