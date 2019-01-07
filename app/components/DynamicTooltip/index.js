import React from 'react';
import Tooltip from 'react-tooltip-lite';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// #region -------------- Component ---------------------------------------------------------------

export const DynamicTooltip = props => {
  const { children } = props;
  let { content } = props;

  if (typeof content === 'object') {
    content = <FormattedMessage {...content} />;
  }

  return (
    <Tooltip content={content} direction="up" tipContentHover>
      {children}
    </Tooltip>
  );
};

DynamicTooltip.propTypes = {
  content: PropTypes.oneOfType([PropTypes.object, PropTypes.node]).isRequired,
  children: PropTypes.node.isRequired,
};

// #endregion
