import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'components/Image';
import FailedLogo from '../../images/failed.png';
import PassedLogo from '../../images/passed.png';

const Wrapper = styled.span`
  margin-left: 10px;
`;

const StatusCheckImage = ({ status }) => (
  <Wrapper>
    <Image
      alt="status-logo"
      src={status === 'Passed' ? PassedLogo : FailedLogo}
    />
  </Wrapper>
);

StatusCheckImage.propTypes = {
  status: PropTypes.string,
};

export default StatusCheckImage;
