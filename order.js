import { ZERO_BYTES32 } from './configuration.js';
import { sign, packSignature, oracleSign } from './signatures.js';

export class Order {
  parameters;
  user;
  admin;
  exchange;
  constructor(user, parameters, admin, exchange) {
    this.user = user;
    this.parameters = parameters;
    this.admin = admin;
    this.exchange = exchange;
  }
  async packNoSigs(provide) {
    return {
      order: this.parameters,
      v: 27,
      r: ZERO_BYTES32,
      s: ZERO_BYTES32,
      extraSignature: '0x',
      signatureVersion: 0,
      blockNumber: (await provide.getBlock('latest')).number,
    };
  }
  async pack(options = {}, provide) {
    const signature = await sign(
      this.parameters,
      options.signer || this.user,
      this.exchange
    );
    return {
      order: this.parameters,
      v: signature.v,
      r: signature.r,
      s: signature.s,
      extraSignature: packSignature(
        await oracleSign(
          this.parameters,
          options.oracle || this.admin,
          this.exchange,
          options.blockNumber || (await provide.getBlock('latest')).number
        )
      ),
      signatureVersion: 0,
      blockNumber: (await provide.getBlock('latest')).number,
    };
  }
}
