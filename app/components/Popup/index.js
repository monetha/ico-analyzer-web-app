import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import Wrapper from './Wrapper';
import ContentWrapper from './ContentWrapper';
import MessageBox from './MessageBox';
import ButtonsBar from './ButtonsBar';
import HollowButton from '../HollowButton';

import { hidePopup, popupAccepted } from '../../containers/App/actions';
import {
  selectIsPopupVisible,
  selectPopupMessage,
} from '../../containers/App/selectors';

const Popup = ({ message, visible, hide, accept }) => {
  if (!visible) {
    return null;
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <MessageBox>
          <FormattedMessage {...message} />
        </MessageBox>
        <ButtonsBar>
          <div>
            <HollowButton onClick={hide}>No</HollowButton>
          </div>
          <div>
            <HollowButton onClick={accept} width="90px">
              Continue
            </HollowButton>
          </div>
        </ButtonsBar>
      </ContentWrapper>
    </Wrapper>
  );
};

Popup.propTypes = {
  visible: PropTypes.bool,
  message: PropTypes.object,
  hide: PropTypes.func.isRequired,
  accept: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  visible: selectIsPopupVisible,
  message: selectPopupMessage,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hide: hidePopup,
      accept: popupAccepted,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Popup);
