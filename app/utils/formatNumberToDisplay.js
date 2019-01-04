const REGEX = /\B(?=(\d{3})+(?!\d))/g;

const formatNumberToDisplay = number => {
  const parsedNumber = Math.round(parseFloat(number) * 100) / 100;
  return parsedNumber.toString().replace(REGEX, ',');
};

export default formatNumberToDisplay;
