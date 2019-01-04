/**
 *
 * RbGeneratedContainerStateless
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectRbGeneratedContainerStateless from './selectors';
import reducer from './reducer';
import messages from './messages';

function RbGeneratedContainerStateless() {
  return (
    <div>
      <Helmet>
        <title>RbGeneratedContainerStateless</title>
        <meta
          name="description"
          content="Description of RbGeneratedContainerStateless"
        />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

RbGeneratedContainerStateless.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rbGeneratedContainerStateless: makeSelectRbGeneratedContainerStateless(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'rbGeneratedContainerStateless',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(RbGeneratedContainerStateless);
