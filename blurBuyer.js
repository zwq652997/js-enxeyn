import { ethers } from 'ethers';
import { abi, Side, ZERO_ADDRESS, ZERO_ERC721 } from './configuration.js';
import { Order } from './order.js';

export async function blur(
  signer,
  provide,
  address,
  tokenid,
  collection,
  price
) {
  let sell = {};
  let sellInput = {};
  let buy = {};
  let buyInput = {};
  let contractAddress = '0x000000000000Ad05Ccc4F10045630fb830B95127';
  const contract = new ethers.Contract(contractAddress, abi, signer);

  sell = generateOrder(
    signer,
    Side.Sell,
    '0x07587c046d4d4BD97C2d64EDBfAB1c1fE28A10E5',
    tokenid,
    collection,
    price,
    {},
    contract
  );

  buy = generateOrder(
    signer,
    Side.Buy,
    address,
    tokenid,
    collection,
    price,
    {},
    contract
  );
  let sign = await sell.pack({}, provide);
  console.log(sign);
  // let s = await buy.packNoSigs(provide);
  // console.log(s);
}

const generateOrder = (
  account,
  side,
  address,
  tokenId,
  collection,
  price,
  admin,
  exchange
) => {
  return new Order(
    account,
    {
      trader: address,
      side: Side.Buy,
      matchingPolicy: ZERO_ERC721,
      collection,
      tokenId,
      amount: 1,
      paymentToken: ZERO_ADDRESS,
      price,
      listingTime: '0',
      expirationTime: '0',
      fees: [],
      salt: 0,
      extraParams: '0x',
    },
    admin,
    exchange
  );
};
