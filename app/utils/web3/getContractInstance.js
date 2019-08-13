import { getProviderInstance } from './walletProvider';

const Web3 = require('web3');

/**
 * getContractInstance takes abi and atAddress
 * and returns a contract instance.
 *
 * @param {JSON} abi contract abi
 * @param {string} atAddress contract address
 */
export const getContractInstance = (abi, atAddress) => {
  const provider = getProviderInstance();
  if (!provider) {
    throw new Error('Please install Metamask or other Ethereum provider');
  }

  const web3 = new Web3(provider);

  const contract = web3.eth.contract(abi);
  const contractInstance = contract.at(atAddress);

  return contractInstance;
};
