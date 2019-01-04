/**
 *
 * RbGeneratedContainerPureComponent
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
import makeSelectRbGeneratedContainerPureComponent from './selectors';
import reducer from './reducer';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class RbGeneratedContainerPureComponent extends React.PureComponent {
  render() {
    return (
      <div>
        <Helmet>
          <title>RbGeneratedContainerPureComponent</title>
          <meta
            name="description"
            content="Description of RbGeneratedContainerPureComponent"
          />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

RbGeneratedContainerPureComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  rbGeneratedContainerPureComponent: makeSelectRbGeneratedContainerPureComponent(),
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
  key: 'rbGeneratedContainerPureComponent',
  reducer,
});

export default compose(
  withReducer,
  withConnect,
)(RbGeneratedContainerPureComponent);
