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
import PropTypes from 'prop-types';

import EditIcoPage from 'containers/EditIcoPage/Loadable';
import CreateIco from 'containers/CreateIco/Loadable';
import IcoList from 'containers/IcoList/Loadable';
import IcoDetailPage from 'containers/IcoDetailPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import RedirectHandler from 'containers/RedirectHandler/Loadable';
import InfoPage from 'containers/InfoPage/Loadable';
import Header from 'components/Header';
import AppLoader from '../../components/Loader/index';
import { selectIsLoading, selectLoaderText } from './selectors';
import GlobalStyle from '../../global-styles';
import RootWrapper from './RootWrapper';

function App(props) {
  return (
    <div>
      <Header />
      <RootWrapper>
        <Switch>
          <Route path="/create-icopass" component={CreateIco} />
          <Route path="/analyse-icopass/:id" component={EditIcoPage} />
          <Route path="/reanalyse-icopass/:id" component={EditIcoPage} />
          <Route path="/ico-list/:id" component={IcoDetailPage} />
          <Route path="/info" component={InfoPage} />
          <Route path="/" component={IcoList} />
          <Route component={NotFoundPage} />
        </Switch>
      </RootWrapper>
      <GlobalStyle />
      <AppLoader isLoading={props.isLoading} message={props.loaderText} />
      <RedirectHandler />
    </div>
  );
}

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loaderText: PropTypes.string,
};

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
  loaderText: selectLoaderText(state),
});

export default withRouter(connect(mapStateToProps)(App));
