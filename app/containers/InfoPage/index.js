/**
 *
 * InfoPage
 *
 */
import React from 'react';
import map from 'lodash/map';
import keys from 'lodash/keys';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectReducer from 'utils/injectReducer';
import { selectMessages } from './selectors';
import {
  selectRedirectPath,
  selectRedirectPageName,
} from '../RedirectHandler/selectors';
import { clearRedirectArtifacts } from '../RedirectHandler/actions';
import { redirect } from '../App/actions';
import reducer from './reducer';
import { resetInfo } from './actions';
import Wrapper from './Wrapper';
import InfoText from './InfoText';
import PrimaryButton from '../../components/PrimaryButton';

export class InfoPage extends React.Component {
  componentWillUnmount() {
    this.props.resetInfo();
  }

  componentDidMount() {
    if (isEmpty(this.props.messages)) {
      this.props.redirect('/');
    }
    return null;
  }

  render() {
    const showRedirectButton = this.props.redirectPath && this.props.pageName;
    return (
      <Wrapper>
        {map(keys(this.props.messages), messageKey => (
          <FormattedMessage
            key={messageKey}
            {...this.props.messages[messageKey]}
            tagName="div"
          >
            {msg => <InfoText>{msg}</InfoText>}
          </FormattedMessage>
        ))}
        {showRedirectButton && (
          <PrimaryButton
            width="250px"
            onClick={() => {
              this.props.redirect(this.props.redirectPath);
              this.props.clearRedirectArtifacts();
            }}
          >
            Redirect to {this.props.pageName}
          </PrimaryButton>
        )}
      </Wrapper>
    );
  }
}

InfoPage.propTypes = {
  messages: PropTypes.object,
  resetInfo: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  clearRedirectArtifacts: PropTypes.func.isRequired,
  redirectPath: PropTypes.string,
  pageName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  messages: selectMessages,
  redirectPath: selectRedirectPath,
  pageName: selectRedirectPageName,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetInfo,
      redirect,
      clearRedirectArtifacts,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'infoPage', reducer });

export default compose(
  withReducer,
  withConnect,
)(InfoPage);
