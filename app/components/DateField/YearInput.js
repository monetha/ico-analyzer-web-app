import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Select from '../Select';
import Option from '../Option';

export const generateYears = () => {
  const years = [];
  const currentYear = moment().year();
  const startYear = currentYear - 15;
  const upto = currentYear + 5;

  for (let i = startYear || currentYear - 50; i < upto; i += 1) {
    years.push(i.toString());
  }

  return years;
};

const YearInput = ({ selectedYear, ...others }) => {
  const years = generateYears();
  return (
    <Select value={selectedYear} {...others}>
      {years.map(yearItem => (
        <Option key={yearItem} value={yearItem}>
          {yearItem}
        </Option>
      ))}
    </Select>
  );
};

YearInput.propTypes = {
  selectedYear: PropTypes.number,
};

YearInput.defaultProps = {
  selectedYear: moment().year(),
};

export default YearInput;
