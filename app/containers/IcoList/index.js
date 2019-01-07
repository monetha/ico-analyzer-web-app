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
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import { push } from 'connected-react-router';
import {
  selectPassportsData,
  selectSelectedPage,
  selectisFetchingPassports,
  selectDoneFetchingAllPassports,
  selectPassportFetchError,
} from './selectors';
import icoListReducer from './reducer';
import icoDetailReducer from '../IcoDetailPage/reducer';
import {
  selectPage,
  fetchIcoListRequest,
  navigateToIcoDetails,
  fetchNextPage,
} from './actions';
import { startLoader } from '../App/actions';
import messages from './messages';
import headerMessages from '../../components/Header/messages';
import generateColumns from './generateColumns';

import PageWrapper from './PageWrapper';
import IcolistHeader from './IcolistHeader';
import Message from './Message';
import FooterContent from './FooterContent';
import BannerFooter from './BannerFooter';
import Footer from './Footer';
import ErrorMessage from './ErrorMessage';
import HeaderText from './HeaderText';
import PageHeader from '../../components/H3';
import IcoTable from '../../components/IcoTable';
import Pagination from '../../components/Pagination';
import GhostButton from '../../components/GhostButton';
import Link from '../../components/Link';
import Image from '../../components/Image';
import MonethaLogo from '../../images/monetha-logo.png';
import PrimaryButton from '../../components/PrimaryButton';

const refreshImg = require('images/refresh.png');

const HeaderButtonsContainer = styled.div`
  margin: 0;
  width: 100%;
  margin-right: -20px;
  margin-bottom: -20px;

  & > * {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
  }
`;

const ListBottomButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const RefreshButton = styled.button`
  margin-left: 15px;
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const RefreshImg = styled.img`
  width: 20px;
  height: auto;
`;

/* eslint-disable react/prefer-stateless-function */
class IcoList extends React.Component {
  constructor(props) {
    super(props);

    props.fetchIcoListRequest();
  }

  render() {
    const {
      selectedPage,
      onSelectPage,
      isFetching,
      fetchNextListPage,
      allPassports,
      doneFetching,
      history,
    } = this.props;
    const passportsToDisplay = allPassports[selectedPage];
    const icoPassportListData =
      isFetching || !passportsToDisplay ? [] : passportsToDisplay;

    const isDisabledNext = doneFetching && !allPassports[selectedPage + 1];
    const isDisabledPrev = !allPassports[selectedPage - 1];

    return (
      <div>
        <IcolistHeader>
          <div>
            <div id="emptyDiv" />
            <FormattedMessage {...messages.icoAnalyzer}>
              {msg => <HeaderText>{msg}</HeaderText>}
            </FormattedMessage>

            <FormattedMessage {...messages.analyzerContent}>
              {msg => <Message>{msg}</Message>}
            </FormattedMessage>

            <HeaderButtonsContainer>
              <Link
                target="_blank"
                href="https://blog.monetha.io/monetha-ico-analyzer"
              >
                <PrimaryButton>How it works</PrimaryButton>
              </Link>

              <Link
                target="_blank"
                href="https://github.com/monetha/decentralized-reputation-framework"
              >
                <PrimaryButton>See documentation</PrimaryButton>
              </Link>
            </HeaderButtonsContainer>
          </div>
          <p>
            <FormattedMessage {...messages.analyzerFooter}>
              {msg => <BannerFooter>{msg}</BannerFooter>}
            </FormattedMessage>
          </p>
        </IcolistHeader>

        <PageWrapper>
          <FormattedMessage {...messages.header}>
            {msg => (
              <PageHeader>
                {msg}
                <RefreshButton type="button" onClick={this.onRefreshClick}>
                  <RefreshImg src={refreshImg} />
                </RefreshButton>
              </PageHeader>
            )}
          </FormattedMessage>
          <IcoTable
            data={[...icoPassportListData]}
            page={0}
            columns={generateColumns(this.navigateToIcoPassPage)}
          />
          {this.props.error ? (
            <ErrorMessage>{this.props.error.message}</ErrorMessage>
          ) : (
            ''
          )}
          <Pagination
            onClickPrev={() => onSelectPage(selectedPage - 1)}
            onClickNext={fetchNextListPage}
            isDisabledNext={isDisabledNext}
            isDisabledPrev={isDisabledPrev}
          />

          <ListBottomButtonsContainer>
            <GhostButton
              emphasized
              onClick={() => history.push('/create-icopass')}
            >
              <FormattedMessage {...headerMessages.createButtonText} />
            </GhostButton>
          </ListBottomButtonsContainer>
        </PageWrapper>

        <Footer>
          <div>
            <Image height="32px" src={MonethaLogo} alt="monetha-logo" />
          </div>
          <FormattedMessage {...messages.footer}>
            {msg => (
              <Link
                target="_blank"
                href="https://github.com/monetha/decentralized-reputation-framework"
              >
                <FooterContent>{msg}</FooterContent>
              </Link>
            )}
          </FormattedMessage>
        </Footer>
      </div>
    );
  }

  navigateToIcoPassPage = passport => {
    if (passport.ico_info) {
      this.props.navigateToIcoDetails(passport);
      return;
    }

    this.props.navigateToIcoAnalysePage(passport);
  };

  onRefreshClick = () => {
    this.props.fetchIcoListRequest();
  };
}

IcoList.propTypes = {
  selectedPage: PropTypes.number,
  navigateToIcoDetails: PropTypes.func.isRequired,
  navigateToIcoAnalysePage: PropTypes.func.isRequired,
  onSelectPage: PropTypes.func.isRequired,
  fetchIcoListRequest: PropTypes.func.isRequired,
  fetchNextListPage: PropTypes.func.isRequired,
  allPassports: PropTypes.array,
  isFetching: PropTypes.bool,
  doneFetching: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedPage: selectSelectedPage,
  allPassports: selectPassportsData,
  isFetching: selectisFetchingPassports,
  doneFetching: selectDoneFetchingAllPassports,
  error: selectPassportFetchError,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      navigateToIcoDetails,
      navigateToIcoAnalysePage: passport =>
        push(`/analyse-icopass/${passport.metadata.passportAddress}`),
      onSelectPage: selectPage,
      fetchIcoListRequest,
      fetchNextListPage: fetchNextPage,
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
