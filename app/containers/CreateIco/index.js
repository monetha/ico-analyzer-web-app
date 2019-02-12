/**
 *
 * CreateIco
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { push } from 'connected-react-router';

import injectReducer from 'utils/injectReducer';
import infoPageReducer from '../InfoPage/reducer';
import { selectSubmissionError, selectPrivateKey } from './selectors';
import { selectIsMetamaskEnabled } from '../App/selectors';
import { enableMetamaskRequest } from '../App/actions';
import { createIcoPassport } from './actions';
import createIcoReducer from './reducer';
import messages from './messages';
import EmptyDiv from '../../components/EmptyDiv';
import PrimaryButton from '../../components/PrimaryButton';
import HollowButton from '../../components/HollowButton';
import requiredMetamaskLogin from '../../utils/requiredMetamaskLogin';
import PageWrapper from './PageWrapper';
import Header from './Header';
import Message from './Message';
import MetamaskConnectSection from '../../components/MetamaskConnectSection';
import FlexBox from '../../components/FlexBox';

class CreateIco extends React.Component {
  constructor(props) {
    super(props);

    props.enableMetamaskRequest();
  }

  render() {
    return (
      <PageWrapper>
        <EmptyDiv sizeY={2} />
        <FormattedMessage {...messages.createHeader}>
          {msg => <Header>{msg}</Header>}
        </FormattedMessage>
        <FormattedMessage {...messages.createMessage}>
          {msg => <Message>{msg}</Message>}
        </FormattedMessage>
        <EmptyDiv sizeY={2} />
        <FormattedMessage {...messages.paybackAfterPayment}>
          {msg => <Message fontWeight="bold">{msg}</Message>}
        </FormattedMessage>
        <EmptyDiv sizeY={3} />
        <FlexBox column alignItems="center">
          <FormattedMessage {...messages.createButtonText}>
            {msg => (
              <PrimaryButton
                onClick={this.props.createIcoPassport}
                disabled={!this.props.isMetamaskEnabled}
              >
                {msg}
              </PrimaryButton>
            )}
          </FormattedMessage>
          <EmptyDiv sizeY={2} />
          <FormattedMessage {...messages.backButtonText}>
            {msg => (
              <HollowButton onClick={this.props.onBack}>{msg}</HollowButton>
            )}
          </FormattedMessage>
        </FlexBox>
        {!this.props.isMetamaskEnabled && (
          <div>
            <EmptyDiv sizeY={2} />
            <FormattedMessage {...messages.connectToMetamaskMessage}>
              {msg => <Message>{msg}</Message>}
            </FormattedMessage>
            <MetamaskConnectSection
              onConnect={this.props.enableMetamaskRequest}
            />
          </div>
        )}
        <EmptyDiv sizeY={2} />
      </PageWrapper>
    );
  }
}

CreateIco.propTypes = {
  createIcoPassport: PropTypes.func.isRequired,
  enableMetamaskRequest: PropTypes.func.isRequired,
  isMetamaskEnabled: PropTypes.bool.isRequired,
  submissionError: PropTypes.object,
  privateKey: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  submissionError: selectSubmissionError,
  privateKey: selectPrivateKey,
  isMetamaskEnabled: selectIsMetamaskEnabled,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createIcoPassport,
      enableMetamaskRequest,
      onBack: () => push('/'),
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withCreateIcoReducer = injectReducer({
  key: 'createIco',
  reducer: createIcoReducer,
});

const withInfoPageReducer = injectReducer({
  key: 'infoPage',
  reducer: infoPageReducer,
});

export default compose(
  withInfoPageReducer,
  withCreateIcoReducer,
  withConnect,
  requiredMetamaskLogin,
)(CreateIco);
