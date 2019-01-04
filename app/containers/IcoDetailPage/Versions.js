import React from 'react';
import PropTypes from 'prop-types';

import DropDown from 'components/DropDown';

const Versions = ({ version, ...restProps }) => {
  const options = [];
  for (let ver = version; ver >= 0; ver -= 1) {
    options.push({ label: ver, value: ver });
  }

  return <DropDown options={options} {...restProps} />;
};

Versions.propTypes = {
  version: PropTypes.number,
};

export default Versions;
