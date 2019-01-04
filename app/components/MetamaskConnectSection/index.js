import React from 'react';
import PropTypes from 'prop-types';
import MetamaskLogo from '../../images/metamask-logo.png';
import Wrapper from './Wrapper';
import LogoWrapper from './LogoWrapper';
import ConnectButton from './ConnectButton';
import MetamaskText from './MetamaskText';

const MetamaskConnectSection = ({ onConnect }) => (
  <Wrapper>
    <LogoWrapper>
      <img src={MetamaskLogo} alt="metamask-logo" />
    </LogoWrapper>
    <div>
      <MetamaskText>Metamask</MetamaskText>
      <ConnectButton onClick={onConnect} />
    </div>
  </Wrapper>
);

MetamaskConnectSection.propTypes = {
  onConnect: PropTypes.func.isRequired,
};

export default MetamaskConnectSection;
