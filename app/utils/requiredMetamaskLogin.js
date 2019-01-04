import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import MessageBox from '../components/MessageBox';
import Span from '../components/Span';
import Link from '../components/Link';

/**
 * Check for metatask login
 *
 */
export default WrappedComponent => {
  class AuthenticatedRoute extends React.Component {
    static WrappedComponent = WrappedComponent;

    static displayName = `withLoggedinUser(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    render() {
      if (!window.web3) {
        return (
          <MessageBox>
            <Span>You do not have metamask installed</Span>
            <br />
            <Span>
              Please install metamask from
              <Link href="https://metamask.io/" target="_blank">
                &nbsp;Metamask&nbsp;
              </Link>
              Homepage
            </Span>
          </MessageBox>
        );
      }

      if (window.web3.eth.accounts.length === 0) {
        return (
          <MessageBox>
            <div>
              <Span>No Metamask logged user found.</Span>
              &nbsp;
              <Span>Please login into metamask to continue</Span>
            </div>
          </MessageBox>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(AuthenticatedRoute, WrappedComponent);
};
