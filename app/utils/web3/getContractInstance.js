/**
 * getContractInstance takes abi and atAddress
 * and returns a contract instance.
 *
 * @param {JSON} abi contract abi
 * @param {string} atAddress contract address
 */
export const getContractInstance = (abi, atAddress) => {
  const contract = window.web3.eth.contract(abi);
  const contractInstance = contract.at(atAddress);

  return contractInstance;
};
