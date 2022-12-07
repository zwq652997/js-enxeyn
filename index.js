import { ethers } from 'ethers';
import { blur } from './blurBuyer.js';

//const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();

// window.ethereum.on('accountsChanged', function (accounts) {
//   // Time to reload your interface with accounts[0]!
//   console.log('dd', accounts);
// });

console.log(window.ethereum.selectedAddress);

const provider = new ethers.providers.Web3Provider(window.ethereum);
console.log(window.ethereum);
provider.send('eth_requestAccounts', ['']); // <- this promps user to connect metamask
console.log(provider);
const signer = provider.getSigner();

const provide = new ethers.providers.Web3Provider(window.ethereum);

const tokenid = 3839;

const price = '34500000000000000';

const collection = '0x5802c586f657c787902280ac091d81832d7faf84';

const address = '0x556d83E8ABf3abdE00cC36B08A2f2dD7dc61ff17';

//blur(signer, provide, address, tokenid, collection, price);

let jsonResponse = {};

jsonResponse.data =
  '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';

let decodedData = (function (x) {
  let plaintext = (function (key, x) {
    let y = '';
    for (let i = 0; i < x.length; i++) {
      let byte = x.charCodeAt(i) ^ key.charCodeAt(i % key.length),
        char = String.fromCharCode(byte);
      y += char;
    }
    return y;
  })(
    'XTtnJ44LDXvZ1MSjdyK4pPT8kg5meJtHF44RdRBGrsaxS6MtG19ekKBxiXgp',
    Buffer.from(x, 'base64').toString('utf-8')
  );
  return plaintext;
})(jsonResponse.data);

let txn = JSON.parse(decodedData).buys[0].txnData;

txn['from'] = '0xcFb18e653156e9F93b84bce2E4F16bD34141Af1e';
//txn['from'] = '0x556d83E8ABf3abdE00cC36B08A2f2dD7dc61ff17';
txn['gasLimit'] = JSON.parse(decodedData).buys[0].gasEstimate;

console.log(txn['data']);

txn['data'] = txn['data'].replace(
  '556d83e8abf3abde00cc36b08a2f2dd7dc61ff17',
  'cFb18e653156e9F93b84bce2E4F16bD34141Af1e'
);

txn['data'] = txn['data'].replace(
  'e1af5ad264405ba2bc07e003fafb3e5f',
  '00000000000000000000000000000000'
);

console.log(txn['data']);

let wallet = new ethers.providers.Web3Provider(window.ethereum)
  .getSigner()
  .connectUnchecked();

console.log(wallet);

console.log();

wallet
  .sendTransaction(txn)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
