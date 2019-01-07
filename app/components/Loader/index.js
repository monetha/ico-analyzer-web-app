import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import Wrapper from './Wrapper';
import Text from './Text';
import Loader from './Loader';

const LoaderWrapper = styled.div`
  margin-bottom: 15px;
`;

const AppLoader = ({ isLoading, message }) => {
  if (!isLoading) {
    return null;
  }

  return (
    <Wrapper>
      <LoaderWrapper>
        <Loader
          src="/images/loader@1x.gif"
          srcSet="/images/loader@2x.gif 2x, /images/loader@3x.gif 3x"
        />
      </LoaderWrapper>

      <div>
        {message && (
          <FormattedMessage {...message}>
            {msg => <Text>{msg}</Text>}
          </FormattedMessage>
        )}
      </div>
    </Wrapper>
  );
};

AppLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.object,
};

export default AppLoader;
