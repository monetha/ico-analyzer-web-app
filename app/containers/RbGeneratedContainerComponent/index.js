/**
 *
 * RbGeneratedContainerComponent
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
import makeSelectRbGeneratedContainerComponent from './selectors';
import reducer from './reducer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class RbGeneratedContainerComponent extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>RbGeneratedContainerComponent</title>
          <meta
            name="description"
            content="Description of RbGeneratedContainerComponent"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

RbGeneratedContainerComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rbGeneratedContainerComponent: makeSelectRbGeneratedContainerComponent(),
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
  key: 'rbGeneratedContainerComponent',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(RbGeneratedContainerComponent);
