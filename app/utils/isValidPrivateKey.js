/**
 * Address validator helper
 */
export const KEY_LENGTH = 64;
export const TEST_REGEX = /[0-9a-fA-F]/;

export const isValidPrivateKey = key =>
  key.length === KEY_LENGTH && TEST_REGEX.test(key);

export default isValidPrivateKey;
