/*
 * EditIcoPage Messages
 *
 * This contains all the text for the EditIcoPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EditIcoPage';

export default defineMessages({
  analyseMessage: {
    id: `${scope}.analyseMessage`,
    defaultMessage: 'Analyze the ICO passport ',
  },
  analyseDescription: {
    id: `${scope}.analyseDescription`,
    defaultMessage:
      'Fill in the required fields to start the analysis. The process should be completed within a few minutes, depending on the Ethereum network load.',
  },
  icoAddress: {
    id: `${scope}.icoAddress`,
    defaultMessage: 'ICO pass address:',
  },
  rerunHeading: {
    id: `${scope}.rerunHeading`,
    defaultMessage: 'Rerun analyzer',
  },
  rerunContent: {
    id: `${scope}.rerunContent`,
    defaultMessage:
      'You can analyze the ICO again. This will create a new version of the report alongside the previous one. Filling in the optional fields may return more accurate results.',
  },
  icoNameLabel: {
    id: `${scope}.icoNameLabel`,
    defaultMessage: 'ICO Name',
  },
  icoNameTooltip: {
    id: `${scope}.icoNameTooltip`,
    defaultMessage:
      'We take data from icorating.com, so the project’s name should match its URL: e. g. monetha-mth for Monetha (https://icorating.com/ico/monetha-mth/)',
  },
  icoNamePlaceholder: {
    id: `${scope}.icoNamePlaceholder`,
    defaultMessage: 'Enter ICO name',
  },
  decimalsLabel: {
    id: `${scope}.decimalsLabel`,
    defaultMessage: 'Decimals',
  },
  decimalsPlaceholder: {
    id: `${scope}.decimalsPlaceholder`,
    defaultMessage: 'Enter decimals',
  },
  tokenContractAddressLabel: {
    id: `${scope}.tokenContractAddressLabel`,
    defaultMessage: 'Token Contract Address',
  },
  tokenContractAddressPlaceholder: {
    id: `${scope}.tokenContractAddressPlaceholder`,
    defaultMessage: 'Enter token contract address',
  },
  ownerAddressLabel: {
    id: `${scope}.ownerAddressLabel`,
    defaultMessage: 'Owner Address',
  },
  ownerAddressPlaceholder: {
    id: `${scope}.ownerAddressPlaceholder`,
    defaultMessage: 'Enter owner address',
  },
  crowdsaleAddressLabel: {
    id: `${scope}.crowdsaleAddressLabel`,
    defaultMessage: 'Crowdsale Address',
  },
  crowdsaleAddressTooltipMessage: {
    id: `${scope}.crowdsaleAddressTooltipMessage`,
    defaultMessage: 'The wallet address of the ICO public crowdsale',
  },
  crowdsaleAddressPlaceholder: {
    id: `${scope}.crowdsaleAddressPlaceholder`,
    defaultMessage: 'Enter crowdsale address',
  },
  cfrLabel: {
    id: `${scope}.cfrLabel`,
    defaultMessage: 'Reported Funds Raised',
  },
  cfrTooltipMessage: {
    id: `${scope}.cfrTooltipMessage`,
    defaultMessage:
      'How much money the project claims to have raised during the ICO',
  },
  cfrPlaceholder: {
    id: `${scope}.cfrPlaceholder`,
    defaultMessage: 'Enter funds raised',
  },
  icoPriceLabel: {
    id: `${scope}.icoPriceLabel`,
    defaultMessage: 'ICO price',
  },
  icoPriceTooltipMessage: {
    id: `${scope}.icoPriceTooltipMessage`,
    defaultMessage: 'The price of tokens during the ICO',
  },
  icoPricePlaceholder: {
    id: `${scope}.icoPricePlaceholder`,
    defaultMessage: 'Enter ico price',
  },
  icoStartDateLabel: {
    id: `${scope}.icoStartDateLabel`,
    defaultMessage: 'ICO start date',
  },
  icoStartDateTooltipMessage: {
    id: `${scope}.icoStartDateTooltipMessage`,
    defaultMessage: 'Start date of ICO',
  },
  icoStartDatePlaceholder: {
    id: `${scope}.icoStartDatePlaceholder`,
    defaultMessage: 'Enter start date',
  },
  icoEndDateLabel: {
    id: `${scope}.icoEndDateLabel`,
    defaultMessage: 'ICO end date',
  },
  icoEndDateTooltipMessage: {
    id: `${scope}.icoEndDateTooltipMessage`,
    defaultMessage: 'End date of ICO',
  },
  icoEndDatePlaceholder: {
    id: `${scope}.icoEndDatePlaceholder`,
    defaultMessage: 'Enter end date',
  },
  requiredMsgText: {
    id: `${scope}.requiredMsgText`,
    defaultMessage: '* Please fill all required fields for analysis',
  },
  analyseText: {
    id: `${scope}.analyseText`,
    defaultMessage: 'Run analyzer',
  },
  reanalyseText: {
    id: `${scope}.reanalyseText`,
    defaultMessage: 'Rerun analyzer',
  },
  requestReceived: {
    id: `${scope}.requestReceived`,
    defaultMessage:
      'We haveve successfully received your request to analyse your ICO',
  },
  postAnalyseInfo: {
    id: `${scope}.postAnalyseInfo`,
    defaultMessage:
      'Once we are done, your ICO will bw listed with the analysed ICOs. You will be redirect to ICO List shortly.',
  },
  revertNote: {
    id: `${scope}.revertNote`,
    defaultMessage:
      'Note: If anythings goes wrong while we analyse, the payment will be reverted to your metamask account.',
  },
  txFailedMessage: {
    id: `${scope}.txFailedMessage`,
    defaultMessage:
      'Ops! Transaction failed!. If the payment is deducted from metamask your account, it will be reverted back soon.',
  },
  blankFieldErrorMessage: {
    id: `${scope}.blankFieldErrorMessage`,
    defaultMessage: 'This field can not be left blank',
  },
  invalidAddressErrorMessage: {
    id: `${scope}.invalidAddressErrorMessage`,
    defaultMessage: 'You have provided an invalid address',
  },
  invalidDecimalsErrorMessage: {
    id: `${scope}.invalidDecimalsErrorMessage`,
    defaultMessage: 'You have provided an invalid decimals value',
  },
  invalidDateRangeErrorMessage: {
    id: `${scope}.invalidDateRangeErrorMessage`,
    defaultMessage: 'Ico Start Date must be earlier than Ico End Date. ',
  },
  ownerAddressTooltipMessage: {
    id: `${scope}.ownerAddressTooltipMessage`,
    defaultMessage:
      'Go to https://etherscan.io/token/<your-token-contract-address>#readContract you will find the owner address as creator address',
  },
  analyseSuccess: {
    id: `${scope}.analyseSuccess`,
    defaultMessage:
      'We are analyzing the ICO. Once the analysis is completed, a new entry will be created in its ICO passport.',
  },
  acceptDisclaimer: {
    id: `${scope}.acceptDisclaimer`,
    defaultMessage: 'You must read and accept terms of service.',
  },
});

export const createCustomMessages = ({ passportAddress }) =>
  defineMessages({
    passportAddressMessage: {
      id: `${scope}.passportAddressMessage`,
      defaultMessage: `ICO pass address: ${passportAddress}`,
    },
  });
