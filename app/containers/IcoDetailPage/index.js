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
import { push } from 'connected-react-router';
import styled from 'styled-components';

import injectReducer from 'utils/injectReducer';
import formatNumberToDisplay from 'utils/formatNumberToDisplay';
import RelativeLayout from 'components/RelativeLayout';
import { selectFormattedDetails, selectCurrentIcoVersion } from './selectors';
import { selectClipboards } from '../App/selectors';
import reducer from './reducer';
import messages, { createCustomMessages } from './messages';
import { reanalyseStart, switchVersion, prepareDetailPage } from './actions';
import { addToClipboard } from '../App/actions';
import PageWrapper from './PageWrapper';
import Versions from './Versions';
import FlexBox from '../../components/FlexBox';
import EmptyDiv from '../../components/EmptyDiv';
import HollowButton from '../../components/HollowButton';
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
import { DynamicTooltip } from '../../components/DynamicTooltip';
import ItemValue from './ItemValue';

const ICOPassportAddressValue = styled(ItemValue)`
  text-align: left;
`;

const StatusCheckTooltipContainer = styled.div`
  display: inline-block;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & > * + * {
    margin-left: 20px;
  }

  @media (max-width: 1024px) {
    margin-top: 15px;
  }
`;

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
      onBack,
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
      {
        label: messages.cfr_currency.defaultMessage,
        value: icoDetails.cfr_currency,
        tooltipMessage: messages.cfr_currencyTooltip,
      },
      {
        label: messages.cfr.defaultMessage,
        value: formatNumberToDisplay(icoDetails.cfr),
        tooltipMessage: messages.cfrTooltip,
      },
      {
        label: messages.icoPrice.defaultMessage,
        value: formatNumberToDisplay(icoDetails.icoPrice, 10000),
        tooltipMessage: messages.icoPriceTooltip,
      },
      {
        label: messages.ico_price_adjusted.defaultMessage,
        value: formatNumberToDisplay(icoDetails.ico_price_adjusted, 10000),
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
      {
        label: messages.eth_rate_start.defaultMessage,
        value: formatNumberToDisplay(icoDetails.eth_rate_start),
        tooltipMessage: messages.eth_rate_startTooltip,
      },
      {
        label: messages.eth_rate_end.defaultMessage,
        value: formatNumberToDisplay(icoDetails.eth_rate_end),
        tooltipMessage: messages.eth_rate_endTooltip,
      },
    ];

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
          icoDetails.token_check_result.funds_raised_diff * 100,
        ),
        tooltipMessage: messages.fundsRaisedDiffTooltip,
        valuePostfix: '%',
      },
      {
        label: messages.adjustedFundsRaisedDiff.defaultMessage,
        value: formatNumberToDisplay(
          icoDetails.token_check_result.funds_raised_adjusted_diff * 100,
        ),
        tooltipMessage: messages.adjustedFundsRaisedDiffTooltip,
        valuePostfix: '%',
      },
    );

    const ethCheckDetails = [
      {
        label: messages.ico_eth_in.defaultMessage,
        tooltipMessage: messages.ico_eth_inTooltip,
        value: formatNumberToDisplay(icoDetails.ico_eth_in),
      },
      {
        label: messages.ico_eth_total.defaultMessage,
        tooltipMessage: messages.ico_eth_totalTooltip,
        value: formatNumberToDisplay(icoDetails.ico_eth_total),
      },
      {
        label: messages.efr_ico_tx.defaultMessage,
        tooltipMessage: messages.efr_ico_txTooltip,
        value: formatNumberToDisplay(icoDetails.efr_ico_tx),
      },
      {
        label: messages.fundsRaisedDiff.defaultMessage,
        tooltipMessage: messages.fundsRaisedDiffTooltip,
        value: formatNumberToDisplay(
          icoDetails.ico_wallet_check_result.funds_raised_diff * 100,
        ),
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
        value: icoDetails.metrics.distribution_start_from_ico_start,
      },
      {
        label: messages.distribution_end_from_ico_end.defaultMessage,
        tooltipMessage: messages.distribution_end_from_ico_endTooltip,
        value: icoDetails.metrics.distribution_end_from_ico_end,
      },
      {
        label: messages.funds_balance_eth.defaultMessage,
        tooltipMessage: messages.funds_balance_ethTooltip,
        value: formatNumberToDisplay(icoDetails.metrics.funds_balance_eth),
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
            headerMessageTooltip={
              createCustomMessages({ icoName: icoDetails.icoName })
                .icoDetailsHeaderTooltip
            }
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
                  <FlexBox>
                    <FormattedMessage {...messages.tokensCheck} />
                    <StatusCheckTooltipContainer>
                      <DynamicTooltip
                        content={messages.tokensCheckStatusTooltip}
                      >
                        <StatusCheckImage
                          status={
                            icoDetails.token_check_result.funds_raised_check
                          }
                        />
                      </DynamicTooltip>
                    </StatusCheckTooltipContainer>
                  </FlexBox>
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
                  <FlexBox>
                    <FormattedMessage {...messages.ethCheck} />
                    <StatusCheckTooltipContainer>
                      <DynamicTooltip content={messages.ethCheckStatusTooltip}>
                        <StatusCheckImage
                          status={
                            icoDetails.ico_wallet_check_result
                              .funds_raised_check
                          }
                        />
                      </DynamicTooltip>
                    </StatusCheckTooltipContainer>
                  </FlexBox>
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
                <ItemLabel>
                  <FormattedMessage {...messages.passportAddress} />
                </ItemLabel>
                <ICOPassportAddressValue>
                  {icoDetails.passportAddress}
                  <CopyLogoWrapper
                    forceInline
                    showCopied={clipboards.passportAddress}
                    onCopy={() =>
                      onCopy('passportAddress', icoDetails.passportAddress)
                    }
                  />
                </ICOPassportAddressValue>
              </RelativeLayout>
            </FlexBox>
            <ActionButtonsContainer>
              <HollowButton onClick={onBack}>Back</HollowButton>
              <DynamicTooltip content={messages.reanalyseTooltip}>
                <PrimaryButton onClick={() => reanalyse(icoDetails)}>
                  Rerun analyzer
                </PrimaryButton>
              </DynamicTooltip>
            </ActionButtonsContainer>
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
  onBack: PropTypes.func,
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
      onBack: () => push('/'),
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
