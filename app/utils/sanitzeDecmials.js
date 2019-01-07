const DEFAULT_DECIMALS_VALUE = 0;

/**
 * sanitzeDecmials calculates the decimals value
 * @param {number} decimals value to perform test
 */
const sanitzeDecmials = decimals => {
  const validNumber = !!parseInt(decimals, 10);

  return validNumber ? decimals : DEFAULT_DECIMALS_VALUE;
};

export default sanitzeDecmials;
