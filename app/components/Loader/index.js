import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Loader from 'react-loader-spinner';
import Wrapper from './Wrapper';
import Text from './Text';

const AppLoader = ({ isLoading, message }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Wrapper>
      <Loader type="Oval" color="#006efb" height={80} width={80} />
      {message && (
        <FormattedMessage {...message}>
          {msg => <Text>{msg}</Text>}
        </FormattedMessage>
      )}
    </Wrapper>
  );
};

AppLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.object,
};

export default AppLoader;
