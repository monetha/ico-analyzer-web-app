/**
 *
 * IcoDetailPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';

import injectReducer from 'utils/injectReducer';
import formatNumberToDisplay from 'utils/formatNumberToDisplay';
import RelativeLayout from 'components/RelativeLayout';
import { selectFormattedDetails, selectCurrentIcoVersion } from './selectors';
import { selectClipboards } from '../App/selectors';
import reducer from './reducer';
import messages from './messages';
import { reanalyseStart, switchVersion, prepareDetailPage } from './actions';
import { addToClipboard } from '../App/actions';
import PageWrapper from './PageWrapper';
import Versions from './Versions';
import FlexBox from '../../components/FlexBox';
import EmptyDiv from '../../components/EmptyDiv';
import IcoDetailCard from './IcoDetailCard';
import CalculateCard from './CalculateCard';
import DetailItemHeader from './DetailItemHeader';
import PaddedView from '../../components/PaddedView';
import ItemLabel from './Itemlabel';
import DetailItem from './DetailItem';
import BorderedItem from './BorderedItem';
import BorderedTable from './BorderedTable';
import CopyLogoWrapper from './CopyLogoWrapper';
import VersionWrapper from './VersionWrapper';
import StatusCheckImage from './StatusCheckImage';
import PrimaryButton from '../../components/PrimaryButton';
import PageHeader from '../../components/H3';
import Tooltip from '../../components/Tooltip';

class IcoDetailPage extends React.Component {
  constructor(props) {
    super(props);

    if (
      !props.icoDetails ||
      (props.icoDetails.passportAddress !== '' &&
        props.icoDetails.passportAddress !== props.match.params.id)
    ) {
      props.prepareDataForDetailsPage(props.match.params.id);
    }
  }

  render() {
    const {
      icoDetails,
      reanalyse,
      switchPassportVersion,
      currentVersion,
      clipboards,
      onCopy,
    } = this.props;

    if (!icoDetails) {
      return null;
    }

    const basicInfo = [
      'icoName',
      'decimals',
      'tokenContractAddress',
      'crowdsaleAddress',
      'tokenIssuerAddress',
      'ownerAddress',
      'fundAddress',
    ].map(key => {
      let type = 'text';
      const value = icoDetails[key];
      let needsCopyIcon = false;
      const tooltipMessage = messages[`${key}Tooltip`];
      if (value && key.endsWith('Address')) {
        type = 'address';
        needsCopyIcon = true;
      }

      return {
        label: messages[key].defaultMessage,
        value: value || '-',
        needsCopyIcon,
        type,
        tooltipMessage,
      };
    });

    const capitalInfo = [
      'cfr_currency',
      'cfr',
      'eth_rate_start',
      'eth_rate_end',
    ].map(key => ({
      label: messages[key].defaultMessage,
      value: icoDetails[key],
      tooltipMessage: messages[`${key}Tooltip`],
    }));

    capitalInfo.splice(
      2,
      0,
      {
        label: messages.icoPrice.defaultMessage,
        value: formatNumberToDisplay(icoDetails.icoPrice),
        tooltipMessage: messages.icoPriceTooltip,
      },
      {
        label: messages.ico_price_adjusted.defaultMessage,
        value: formatNumberToDisplay(icoDetails.ico_price_adjusted),
        tooltipMessage: messages.ico_price_adjustedTooltip,
      },
      {
        label: messages.icoStartDate.defaultMessage,
        value: icoDetails.icoStartDate.format('DD MMM YYYY'),
      },
      {
        label: messages.icoEndDate.defaultMessage,
        value: icoDetails.icoEndDate.format('DD MMM YYYY'),
      },
    );

    const tokensCheckDetails = [
      'tokens_issued',
      'efr_token',
      'efr_token_adjusted',
    ].map(key => ({
      label: messages[key].defaultMessage,
      value: formatNumberToDisplay(icoDetails[key]),
      tooltipMessage: messages[`${key}Tooltip`],
    }));

    tokensCheckDetails.splice(
      tokensCheckDetails.length,
      0,
      {
        label: messages.fundsRaisedDiff.defaultMessage,
        value: formatNumberToDisplay(
          icoDetails.token_check_result.funds_raised_diff,
        ),
        tooltipMessage: messages.fundsRaisedDiffTooltip,
        valuePostfix: '%',
      },
      {
        label: messages.adjustedFundsRaisedDiff.defaultMessage,
        value: formatNumberToDisplay(
          icoDetails.token_check_result.funds_raised_adjusted_diff,
        ),
        tooltipMessage: messages.adjustedFundsRaisedDiffTooltip,
        valuePostfix: '%',
      },
    );

    const ethCheckDetails = [
      {
        label: messages.ico_eth_in.defaultMessage,
        tooltipMessage: messages.ico_eth_inTooltip,
        value: icoDetails.ico_eth_in,
      },
      {
        label: messages.ico_eth_total.defaultMessage,
        tooltipMessage: messages.ico_eth_totalTooltip,
        value: icoDetails.ico_eth_total,
      },
      {
        label: messages.efr_ico_tx.defaultMessage,
        tooltipMessage: messages.efr_ico_txTooltip,
        value: icoDetails.efr_ico_tx,
      },
      {
        label: messages.fundsRaisedDiff.defaultMessage,
        tooltipMessage: messages.fundsRaisedDiffTooltip,
        value: icoDetails.ico_wallet_check_result.funds_raised_diff,
        valuePostfix: '%',
      },
    ];

    const metricsDetails = [
      {
        label: messages.distribution_days.defaultMessage,
        tooltipMessage: messages.distribution_daysTooltip,
        value: icoDetails.metrics.distribution_days,
      },
      {
        label: messages.distribution_start_from_ico_start.defaultMessage,
        tooltipMessage: messages.distribution_start_from_ico_startTooltip,
        value: icoDetails.icoStartDate.format('DD MMM YYYY'),
      },
      {
        label: messages.distribution_end_from_ico_end.defaultMessage,
        tooltipMessage: messages.distribution_end_from_ico_endTooltip,
        value: icoDetails.icoEndDate.format('DD MMM YYYY'),
      },
      {
        label: messages.funds_balance_eth.defaultMessage,
        tooltipMessage: messages.funds_balance_ethTooltip,
        value: icoDetails.metrics.funds_balance_eth,
      },
    ];

    return (
      <PageWrapper>
        <PaddedView>
          <FlexBox justifyContent="space-between" alignItems="center">
            <DetailItemHeader>{icoDetails.icoName}</DetailItemHeader>
            <FlexBox justifyContent="flex-end" alignItems="center">
              <VersionWrapper>
                <FormattedMessage {...messages.version}>
                  {msg => (
                    <ItemLabel>
                      {msg}
                      &nbsp;
                    </ItemLabel>
                  )}
                </FormattedMessage>
                <EmptyDiv sizeX={2} />
                <Versions
                  onChange={e => switchPassportVersion(e.target.value)}
                  version={currentVersion}
                />
              </VersionWrapper>
            </FlexBox>
          </FlexBox>
        </PaddedView>
        <FlexBox>
          <IcoDetailCard
            headerMessage={messages.generalInformation}
            details={basicInfo}
            clipboards={clipboards}
            onCopy={onCopy}
          />
          <IcoDetailCard
            headerMessage={messages.icoDetails}
            details={capitalInfo}
          />
        </FlexBox>
        <PaddedView>
          <CalculateCard>
            <FormattedMessage {...messages.calculatedData}>
              {msg => <PageHeader>{msg}</PageHeader>}
            </FormattedMessage>
            <FlexBox>
              <FlexBox column flex={3}>
                <BorderedItem
                  borderLeft="none"
                  borderTop="none"
                  borderBottom="none"
                  borderRight="none"
                >
                  <FormattedMessage {...messages.tokensCheck} />
                  <StatusCheckImage
                    status={icoDetails.token_check_result.funds_raised_check}
                  />
                </BorderedItem>
                <BorderedItem
                  borderLeft="none"
                  borderBottom="none"
                  borderRight="none"
                  padding="none"
                >
                  <table>
                    <tbody>
                      {tokensCheckDetails.map(detail => (
                        <DetailItem key={detail.label} {...detail} />
                      ))}
                    </tbody>
                  </table>
                </BorderedItem>
              </FlexBox>
              <FlexBox column flex={2}>
                <BorderedItem borderTop="none" borderBottom="none">
                  <FormattedMessage {...messages.ethCheck} />
                  <StatusCheckImage
                    status={
                      icoDetails.ico_wallet_check_result.funds_raised_check
                    }
                  />
                </BorderedItem>
                <BorderedTable>
                  <table>
                    <tbody>
                      {ethCheckDetails.map(detail => (
                        <DetailItem key={detail.label} {...detail} />
                      ))}
                    </tbody>
                  </table>
                </BorderedTable>
              </FlexBox>
              <FlexBox column flex={2}>
                <BorderedItem
                  borderLeft="none"
                  borderTop="none"
                  borderBottom="none"
                  borderRight="none"
                >
                  <FormattedMessage {...messages.metrics} />
                </BorderedItem>
                <BorderedItem
                  borderBottom="none"
                  borderRight="none"
                  borderLeft="none"
                  padding="none"
                >
                  <table>
                    <tbody>
                      {metricsDetails.map(detail => (
                        <DetailItem key={detail.label} {...detail} />
                      ))}
                    </tbody>
                  </table>
                </BorderedItem>
              </FlexBox>
            </FlexBox>
          </CalculateCard>
        </PaddedView>
        <PaddedView>
          <FlexBox>
            <FlexBox>
              <RelativeLayout>
                <FormattedMessage {...messages.passportAddress} />
                :&nbsp;
                {icoDetails.passportAddress}
                <CopyLogoWrapper
                  showCopied={clipboards.passportAddress}
                  onCopy={() =>
                    onCopy('passportAddress', icoDetails.passportAddress)
                  }
                />
              </RelativeLayout>
            </FlexBox>
            <Tooltip tooltipMessage={messages.reanalyseTooltip} leftAlign>
              <PrimaryButton onClick={() => reanalyse(icoDetails)}>
                Rerun analyzer
              </PrimaryButton>
            </Tooltip>
          </FlexBox>
        </PaddedView>
      </PageWrapper>
    );
  }
}

IcoDetailPage.propTypes = {
  icoDetails: PropTypes.object,
  reanalyse: PropTypes.func,
  prepareDataForDetailsPage: PropTypes.func,
  switchPassportVersion: PropTypes.func,
  currentVersion: PropTypes.number,
  clipboards: PropTypes.object,
  onCopy: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  icoDetails: selectFormattedDetails,
  currentVersion: selectCurrentIcoVersion,
  clipboards: selectClipboards,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      reanalyse: reanalyseStart,
      switchPassportVersion: switchVersion,
      prepareDataForDetailsPage: prepareDetailPage,
      onCopy: addToClipboard,
    },
    dispatch,
  );

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'icoDetail', reducer });

export default compose(
  withReducer,
  withConnect,
)(IcoDetailPage);
