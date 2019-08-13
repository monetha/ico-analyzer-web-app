import { getWeb3 } from '../services/web3Provider';

export function toHex(value) {
  if (value === null || value === undefined) {
    return null;
  }

  const web3 = getWeb3();
  if (!web3 || !web3.toHex) {
    return null;
  }

  return web3.toHex(value);
}
