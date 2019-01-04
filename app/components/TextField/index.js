import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import noop from 'lodash/noop';

import Input from './Input';
import Label from './Label';
import Estrick from '../Estrick';
import ErrorMessage from './ErrorMessage';
import Tooltip from '../Tooltip';
import Image from '../Image';
import infoIcon from '../../images/info.png';

const Wrapper = styled.div`
  flex: 1;
  margin: 10px 0;
`;

function TextField(props) {
  const onBlur = props.onBlur || noop;
  const shouldRenderLabel = !props.renderLabel && props.label;
  return (
    <Wrapper>
      {props.renderLabel && props.renderLabel(props)}
      {shouldRenderLabel && (
        <Label>
          <FormattedMessage {...props.label} />
          {props.required && <Estrick />}
          {props.tooltipMessage && (
            <Tooltip
              tooltipMessage={props.tooltipMessage}
              tooltipWidth={props.tooltipWidth}
              leftAlign={props.leftAlign}
            >
              <Image src={infoIcon} alt="info-icon" />
            </Tooltip>
          )}
        </Label>
      )}
      <FormattedMessage {...props.placeholder}>
        {msg => (
          <Input
            placeholder={msg}
            onChange={e => props.onChange(e, props)}
            type={props.type}
            value={props.value}
            disabled={props.disabled}
            onBlur={e => onBlur(e, props)}
            error={props.error}
          />
        )}
      </FormattedMessage>
      {props.error && (
        <FormattedMessage {...props.error}>
          {msg => <ErrorMessage>{msg}</ErrorMessage>}
        </FormattedMessage>
      )}
    </Wrapper>
  );
}

TextField.propTypes = {
  label: PropTypes.object,
  placeholder: PropTypes.object,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  renderLabel: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};

export default TextField;
