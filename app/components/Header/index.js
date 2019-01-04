import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Wrapper from './Wrapper';
import HeaderText from './HeaderText';
import LogoWrapper from './LogoWrapper';
import GhostButton from '../GhostButton';
import Image from '../Image';
import EmptyDiv from '../EmptyDiv';
import messages from './messages';
import HeaderButtons from './HeaderButtons';

import MonethaLogo from '../../images/monetha-logo.png';

const Header = props => (
  <Wrapper>
    <LogoWrapper>
      <Link to="/">
        <Image src={MonethaLogo} alt="monetha-logo" />
      </Link>
      <HeaderText>
        <FormattedMessage {...messages.headerText} />
      </HeaderText>
    </LogoWrapper>

    <EmptyDiv sizeX={8} />
    <HeaderButtons justifyContent="flex-end">
      <GhostButton onClick={() => props.history.push('/create-icopass')}>
        <FormattedMessage {...messages.createButtonText} />
      </GhostButton>
      <EmptyDiv sizeX={2} />
      <GhostButton onClick={() => props.history.push('/')}>
        <FormattedMessage {...messages.listButtonText} />
      </GhostButton>
    </HeaderButtons>
    <EmptyDiv sizeX={2} />
  </Wrapper>
);

Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
