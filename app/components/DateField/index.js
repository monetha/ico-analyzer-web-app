import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import FlexBox from '../FlexBox';
import DateInput from './DateInput';
import MonthInput from './MonthInput';
import YearInput from './YearInput';
import EmptyDiv from '../EmptyDiv';

const DateField = props => {
  const { value, onChange } = props;
  const currentValue = moment(value);

  const handleOnChange = (type, event) => {
    const updatedEvent = {
      ...event,
      target: {
        ...event.target,
        value: currentValue[type](event.target.value),
      },
    };

    onChange(updatedEvent, props);
  };

  return (
    <FlexBox>
      <YearInput
        selectedYear={currentValue.year()}
        onChange={e => handleOnChange('year', e)}
      />
      <EmptyDiv sizeX={2} />
      <MonthInput
        selectedMonth={currentValue.month()}
        onChange={e => handleOnChange('month', e)}
      />
      <EmptyDiv sizeX={2} />
      <DateInput
        timeM={value}
        selectedDate={currentValue.date()}
        onChange={e => handleOnChange('date', e)}
      />
    </FlexBox>
  );
};

DateField.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
};

DateField.defaultProps = {
  value: moment(),
};

export default DateField;
