/**
 * Decimals validator helper
 */
export const MIN_DECIMAL_VALUE = 0;
export const MAX_DECIMAL_VALUE = 18;

export const isValidDecimal = decimal =>
  decimal >= MIN_DECIMAL_VALUE && decimal <= MAX_DECIMAL_VALUE;

export default isValidDecimal;
