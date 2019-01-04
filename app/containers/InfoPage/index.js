/**
 *
 * InfoPage
 *
 */
import React from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectReducer from 'utils/injectReducer';
import { selectMessages } from './selectors';
import reducer from './reducer';
import { resetInfo } from './actions';
import Wrapper from './Wrapper';

export class InfoPage extends React.Component {
  componentWillUnmount() {
    this.props.resetInfo();
  }

  render() {
    return (
      <Wrapper>
        {map(this.props.messages, message => (
          <FormattedMessage key={message.id} {...message} tagName="div" />
        ))}
      </Wrapper>
    );
  }
}

InfoPage.propTypes = {
  messages: PropTypes.array,
  resetInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  messages: selectMessages,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetInfo,
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
