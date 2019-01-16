import config from 'config';

const Web3 = require('web3');

let web3 = null;

export function getWeb3() {
  if (web3) {
    return web3;
  }

  web3 = new Web3(new Web3.providers.HttpProvider(config.PROVIDER_URL));

  if (!web3.isConnected()) {
    throw new Error('Ethereum node address is incorrect');
  }

  return web3;
}
