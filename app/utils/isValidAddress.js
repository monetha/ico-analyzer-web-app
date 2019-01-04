/**
 * Address validator helper
 */
export const ADDRESS_LENGTH = 42;
export const ADDRESS_INITIAL = '0x';

export const isValidAddress = address =>
  address.length === ADDRESS_LENGTH && address.startsWith(ADDRESS_INITIAL);

export default isValidAddress;
