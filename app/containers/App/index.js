/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import EditIcoPage from 'containers/EditIcoPage/Loadable';
import CreateIco from 'containers/CreateIco/Loadable';
import IcoList from 'containers/IcoList/Loadable';
import IcoDetailPage from 'containers/IcoDetailPage/Loadable';
import RedirectHandler from 'containers/RedirectHandler/Loadable';
import InfoPage from 'containers/InfoPage/Loadable';
import Header from 'components/Header';
import Popup from 'components/Popup';
import AppLoader from '../../components/Loader/index';
import CookiePolicy from '../../components/CookiePolicy';
import {
  selectIsLoading,
  selectLoaderText,
  selectCookiePolicyStatus,
} from './selectors';
import GlobalStyle from '../../global-styles';
import RootWrapper from './RootWrapper';
import { selectPage } from '../IcoList/actions';
import { acceptCookiePolicy, checkCookiePolicyStatus } from './actions';

function App(props) {
  return (
    <div>
      <Header selectPage={props.selectPage} />
      <RootWrapper>
        <Switch>
          <Route path="/create-icopass" component={CreateIco} />
          <Route path="/analyse-icopass/:id" component={EditIcoPage} />
          <Route path="/reanalyse-icopass/:id" component={EditIcoPage} />
          <Route path="/ico-list/:id" component={IcoDetailPage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/" component={IcoList} />
          <Route component={IcoList} />
        </Switch>
      </RootWrapper>
      <GlobalStyle />
      <Popup />
      <CookiePolicy
        onClose={props.acceptCookiePolicy}
        cookiePolicyStatus={props.cookiePolicyStatus}
        checkCookiePolicyStatus={props.checkCookiePolicyStatus}
      />
      <AppLoader isLoading={props.isLoading} message={props.loaderText} />
      <RedirectHandler />
    </div>
  );
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  cookiePolicyStatus: PropTypes.bool,
  selectPage: PropTypes.func.isRequired,
  acceptCookiePolicy: PropTypes.func.isRequired,
  checkCookiePolicyStatus: PropTypes.func.isRequired,
  loaderText: PropTypes.object,
};

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  loaderText: selectLoaderText(state),
  cookiePolicyStatus: selectCookiePolicyStatus(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectPage,
      acceptCookiePolicy,
      checkCookiePolicyStatus,
    },
    dispatch,
  );

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
