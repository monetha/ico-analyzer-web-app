/**
 *
 * IcoList Page: This page is responsible to display all the icos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import map from 'lodash/map';

import injectReducer from 'utils/injectReducer';
import { selectPassportsData, selectSelectedPage } from './selectors';
import icoListReducer from './reducer';
import icoDetailReducer from '../IcoDetailPage/reducer';
import {
  selectPage,
  fetchIcoListRequest,
  navigateToIcoDetails,
} from './actions';
import { startLoader } from '../App/actions';
import messages from './messages';
import generateColumns from './generateColumns';
import { ITEMS_PER_PAGE } from './constants';

import PageWrapper from './PageWrapper';
import IcolistHeader from './IcolistHeader';
import Message from './Message';
import FooterContent from './FooterContent';
import BannerFooter from './BannerFooter';
import Footer from './Footer';
import HeaderText from './HeaderText';
import PageHeader from '../../components/H3';
import IcoTable from '../../components/IcoTable';
import Pagination from '../../components/Pagination';
import MonethaLogo from '../../images/monetha-logo.png';

/* eslint-disable react/prefer-stateless-function */
class IcoList extends React.Component {
  constructor(props) {
    super(props);

    props.startLoader(messages.fetchingListDataLoaderMessage);
    props.fetchIcoListRequest();
  }

  render() {
    const { navigate, selectedPage, onSelectPage, passports } = this.props;
    const icoPassportListData = map(passports, passport => passport);

    return (
      <div>
        <IcolistHeader>
          <div>
            <div id="rotateDiv" />
            <div id="emptyDiv" />
            <FormattedMessage {...messages.icoAnalyzer}>
              {msg => <HeaderText>{msg}</HeaderText>}
            </FormattedMessage>
            <FormattedMessage {...messages.analyzerContent}>
              {msg => <Message>{msg}</Message>}
            </FormattedMessage>
          </div>
          <p>
            <FormattedMessage {...messages.analyzerFooter}>
              {msg => <BannerFooter>{msg}</BannerFooter>}
            </FormattedMessage>
          </p>
        </IcolistHeader>

        <PageWrapper>
          <FormattedMessage {...messages.header}>
            {msg => <PageHeader>{msg}</PageHeader>}
          </FormattedMessage>
          <IcoTable
            data={icoPassportListData}
            page={selectedPage}
            columns={generateColumns(navigate)}
          />
          <Pagination
            itemsCount={icoPassportListData.length}
            itemsPerPage={ITEMS_PER_PAGE}
            selectedPage={selectedPage}
            onSelect={onSelectPage}
          />
        </PageWrapper>

        <Footer>
          <div>
            <img src={MonethaLogo} alt="monetha-logo" />
          </div>
          <FormattedMessage {...messages.footer}>
            {msg => <FooterContent>{msg}</FooterContent>}
          </FormattedMessage>
        </Footer>
      </div>
    );
  }
}

IcoList.propTypes = {
  selectedPage: PropTypes.number,
  navigate: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
  fetchIcoListRequest: PropTypes.func.isRequired,
  passports: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  selectedPage: selectSelectedPage,
  passports: selectPassportsData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigate: navigateToIcoDetails,
      onSelectPage: selectPage,
      fetchIcoListRequest,
      startLoader,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withIcoListReducer = injectReducer({
  key: 'icoList',
  reducer: icoListReducer,
});
const withIcoDetailReducer = injectReducer({
  key: 'icoDetail',
  reducer: icoDetailReducer,
});

export default compose(
  withIcoListReducer,
  withIcoDetailReducer,
  withConnect,
  withRouter,
)(IcoList);
