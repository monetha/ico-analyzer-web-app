import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import Message from './Message';

import InfoWrapper from './InfoWrapper';

const Tooltip = ({ children, tooltipMessage, isOpen, ...restProps }) => (
  <Wrapper>
    <InfoWrapper className={isOpen ? 'open' : null}>
      {children}
      <Message {...restProps}>
        {typeof tooltipMessage === 'object' && (
          <FormattedMessage {...tooltipMessage} />
        )}
        {typeof tooltipMessage === 'string' && <div>{tooltipMessage}</div>}
      </Message>
    </InfoWrapper>
  </Wrapper>
);

Tooltip.propTypes = {
  tooltipMessage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  leftAlign: PropTypes.bool,
};

Tooltip.defaultProps = {
  leftAlign: false,
};

export default Tooltip;
