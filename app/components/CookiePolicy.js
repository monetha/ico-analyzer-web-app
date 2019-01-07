import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  width: 75%;
  max-width: 1168px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  color: #777;
  background-color: rgba(238, 246, 255, 0.9);
  padding: 15px 20px;
  border-radius: 5px;
  text-align: center;
`;

const Text = styled.span`
  font-size: 14px;
  line-height: 18px;
`;

const CloseButton = styled.div`
  position: absolute;
  padding: 0;
  top: 50%;
  right: 45px;
  transform: translateY(-50%);
  font-size: 28px;
  color: #aaa;
  cursor: pointer;
  outline: none;
`;

class CookiePolicy extends React.Component {
  constructor(props) {
    super(props);
    props.checkCookiePolicyStatus();
  }

  render() {
    const { onClose, cookiePolicyStatus } = this.props;
    if (cookiePolicyStatus) {
      return null;
    }

    return (
      <Wrapper>
        <Text>
          To help improve the experience using Monetha website, we use cookies.
          By clicking on or navigating the site, you agree to allow us to
          collect <br /> information through cookies. Learn more, including
          about available controls:
          <a target="_blank" href="https://www.monetha.io/docs/cookies-policy">
            cookie policy
          </a>
          .<CloseButton onClick={onClose}>X</CloseButton>
        </Text>
      </Wrapper>
    );
  }
}

CookiePolicy.propTypes = {
  onClose: PropTypes.func.isRequired,
  checkCookiePolicyStatus: PropTypes.func.isRequired,
  cookiePolicyStatus: PropTypes.bool,
};

export default CookiePolicy;
