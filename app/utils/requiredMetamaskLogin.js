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
              Please install the
              <Link href="https://metamask.io/" target="_blank">
                &nbsp;Metamask extension&nbsp;
              </Link>
            </Span>
          </MessageBox>
        );
      }

      if (window.web3.eth.accounts.length === 0) {
        return (
          <MessageBox>
            <div>
              <Span>
                No Metamask user found. Please login into Metamask and press
                &quot;Analyze ICO&quot; to continue.
              </Span>
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
