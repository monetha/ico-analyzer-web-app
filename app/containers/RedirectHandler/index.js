/**
 *
 * RedirectHandler
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectReducer from 'utils/injectReducer';
import Wrapper from './Wrapper';
import reducer from './reducer';
import * as actions from './actions';
import {
  selectRedirectPath,
  selectRedirectTimeout,
  selectRedirectPageName,
} from './selectors';

class RedirectHandler extends React.Component {
  constructor(props) {
    super(props);

    if (props.path) {
      this.interval = setInterval(this.handleRedirect, 1000);
    }
  }

  render() {
    const { path, timeout, pageName } = this.props;

    if (!path) {
      return null;
    }

    return (
      <Wrapper>
        You will be redirected to {pageName} in {timeout} seconds
      </Wrapper>
    );
  }
}

RedirectHandler.propTypes = {
  path: PropTypes.string,
  timeout: PropTypes.number,
  pageName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  path: selectRedirectPath,
  timeout: selectRedirectTimeout,
  pageName: selectRedirectPageName,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setRedirectTimeout: actions.setRedirectTimeout,
      setRedirectPath: actions.setRedirectPath,
      setRedirectPageName: actions.setRedirectPageName,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'redirectHandler', reducer });

export default compose(
  withReducer,
  withConnect,
)(RedirectHandler);
