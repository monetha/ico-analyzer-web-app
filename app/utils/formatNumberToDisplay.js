const REGEX = /\B(?=(\d{3})+(?!\d))/g;
const ZERO_POSTFIX = '0';
const DOUBLE_ZERO_POSTFIX = '00';

const formatNumberToDisplay = (number, decimals = 100) => {
  const parsedNumber = Math.round(parseFloat(number) * decimals) / decimals;
  let formattedNumber = parsedNumber.toString();

  if (formattedNumber === '0') {
    return formattedNumber;
  }

  const decimalPart = formattedNumber.split('.')[1];
  formattedNumber = formattedNumber.split('.')[0].replace(REGEX, ',');

  const hasNoDecimalDigits = !decimalPart;
  if (hasNoDecimalDigits) {
    return `${formattedNumber}.${DOUBLE_ZERO_POSTFIX}`;
  }

  const hasOneDecimalDigit = decimalPart.length === 1;
  if (hasOneDecimalDigit) {
    return `${formattedNumber}${ZERO_POSTFIX}`;
  }

  return `${formattedNumber}.${decimalPart}`;
};

export default formatNumberToDisplay;
