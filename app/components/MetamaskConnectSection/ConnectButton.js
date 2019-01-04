import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.div`
  color: #0072ff;
  text-decoration: none;
  font-size: 12px;
  cursor: pointer;
`;

const ConnectButton = ({ onClick }) => (
  <Button onClick={onClick}>Connect with MetaMask</Button>
);

ConnectButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ConnectButton;
