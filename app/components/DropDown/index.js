import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import Option from '../Option';

const DropDown = props => (
  <Select {...props}>
    {props.options.map(option => (
      <Option key={option.value} value={option.value}>
        {option.label}
      </Option>
    ))}
  </Select>
);

DropDown.propTypes = {
  options: PropTypes.array,
};

export default DropDown;
