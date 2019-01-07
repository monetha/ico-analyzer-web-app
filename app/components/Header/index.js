import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import HeaderText from './HeaderText';
import LogoWrapper from './LogoWrapper';
import GhostButton from '../GhostButton';
import Image from '../Image';
import EmptyDiv from '../EmptyDiv';
import messages from './messages';
import HeaderButtons from './HeaderButtons';
import HardRedirectLink from '../Link';

import MonethaLogo from '../../images/monetha-logo-beta.png';

const Header = props => (
  <Wrapper>
    <LogoWrapper>
      <HardRedirectLink href="https://www.monetha.io" target="_blank">
        <Image height="32px" src={MonethaLogo} alt="monetha-logo" />
      </HardRedirectLink>
      <HeaderText
        onClick={() => {
          if (props.history.location.pathname === '/') {
            props.selectPage(0);
          }

          props.history.push('/');
        }}
      >
        <FormattedMessage {...messages.headerText} />
      </HeaderText>
    </LogoWrapper>

    <EmptyDiv sizeX={8} />
    <HeaderButtons justifyContent="flex-end">
      <GhostButton
        width="165px"
        emphasized
        onClick={() => props.history.push('/create-icopass')}
      >
        <FormattedMessage {...messages.createButtonText} />
      </GhostButton>
      <EmptyDiv sizeX={2} />

      {props.history.location.pathname !== '/' && (
        <GhostButton onClick={() => props.history.push('/')}>
          <FormattedMessage {...messages.listButtonText} />
        </GhostButton>
      )}
    </HeaderButtons>
    <EmptyDiv sizeX={2} />
  </Wrapper>
);

Header.propTypes = {
  history: PropTypes.object.isRequired,
  selectPage: PropTypes.func.isRequired,
};

export default withRouter(Header);
