import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Select from '../Select';
import Option from '../Option';

export const months = moment.months().map((month, monthIndex) => monthIndex);

const MonthInput = ({ selectedMonth, ...others }) => (
  <Select value={selectedMonth} {...others}>
    {months.map(monthItem => (
      <Option key={monthItem} value={monthItem}>
        {monthItem + 1}
      </Option>
    ))}
  </Select>
);

MonthInput.propTypes = {
  month: PropTypes.number,
};

MonthInput.defaultProps = {
  month: moment().month(),
};

export default MonthInput;
