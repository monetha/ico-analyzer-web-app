/**
 * calcUpdateVersion calculates the next version number for icopassport
 * @param {number} version the current version
 */
const calcUpdateVersion = version =>
  typeof version === 'undefined' ? 0 : version + 1;

export default calcUpdateVersion;
