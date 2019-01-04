import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Select from '../Select';
import Option from '../Option';

export const generateDates = (startDate, endDate) => {
  const dates = [];

  for (let date = startDate; date <= endDate; date += 1) {
    dates.push(date);
  }

  return dates;
};

const DateInput = ({ timeM, selectedDate, ...others }) => {
  const dates = generateDates(
    timeM.startOf('month').date(),
    timeM.endOf('month').date(),
  );

  return (
    <Select value={selectedDate} {...others}>
      {dates.map(dateItem => (
        <Option key={dateItem} value={dateItem}>
          {dateItem}
        </Option>
      ))}
    </Select>
  );
};

DateInput.propTypes = {
  month: PropTypes.number,
};

DateInput.defaultProps = {
  month: moment().month(),
};

export default DateInput;
