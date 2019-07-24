/*
 * IcoDetailPage Messages
 *
 * This contains all the text for the IcoDetailPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.IcoDetailPage';

export default defineMessages({
  icoName: {
    id: `${scope}.icoName`,
    defaultMessage: 'ICO Name',
  },
  icoNameTooltip: {
    id: `${scope}.icoNameTooltip`,
    defaultMessage:
      'We take data from icorating.com, so the project’s name should match its URL: e. g. monetha-mth for Monetha',
  },
  decimals: {
    id: `${scope}.decimals`,
    defaultMessage: 'Decimals',
  },
  tokenContractAddress: {
    id: `${scope}.tokenContractAddress`,
    defaultMessage: 'Token contract address',
  },
  cfr_currency: {
    id: `${scope}.cfr_currency`,
    defaultMessage: 'Currency of raised funds',
  },
  cfr: {
    id: `${scope}.cfr`,
    defaultMessage: 'Reported amount raised',
  },
  cfrTooltip: {
    id: `${scope}.cfrTooltip`,
    defaultMessage:
      'How much money the project claims to have raised during the ICO',
  },
  icoStartDate: {
    id: `${scope}.icoStartDate`,
    defaultMessage: 'ICO start date',
  },
  icoEndDate: {
    id: `${scope}.icoEndDate`,
    defaultMessage: 'ICO end date',
  },
  icoPrice: {
    id: `${scope}.icoPrice`,
    defaultMessage: 'ICO price',
  },
  tokens_issued: {
    id: `${scope}.tokens_issued`,
    defaultMessage: 'Token Issued',
  },
  eth_rate_start: {
    id: `${scope}.eth_rate_start`,
    defaultMessage: 'ETH price start',
  },
  eth_rate_startTooltip: {
    id: `${scope}.eth_rate_startTooltip`,
    defaultMessage: 'ETH price at the start of the ICO',
  },
  eth_rate_end: {
    id: `${scope}.eth_rate_end`,
    defaultMessage: 'ETH price end',
  },
  eth_rate_endTooltip: {
    id: `${scope}.eth_rate_endTooltip`,
    defaultMessage: 'ETH price at the end of the ICO',
  },
  ico_price_adjusted: {
    id: `${scope}.ico_price_adjusted`,
    defaultMessage: 'Adjusted ICO price',
  },
  ico_price_adjustedTooltip: {
    id: `${scope}.ico_price_adjustedTooltip`,
    defaultMessage: 'ICO price adjusted to ETH price fluctuations',
  },
  fundAddress: {
    id: `${scope}.fundAddress`,
    defaultMessage: 'ETH funds address',
  },
  fundAddressTooltip: {
    id: `${scope}.fundAddressTooltip`,
    defaultMessage: 'The address where all the ETH were sent during the ICO',
  },
  passportAddress: {
    id: `${scope}.fundAddress`,
    defaultMessage: 'ICO Identity address',
  },
  ownerAddress: {
    id: `${scope}.ownerAddress`,
    defaultMessage: 'Token contract owner address',
  },
  ownerAddressTooltip: {
    id: `${scope}.ownerAddress`,
    defaultMessage: 'The address of the creator of token contract address',
  },
  tokenIssuerAddress: {
    id: `${scope}.tokenIssuerAddress`,
    defaultMessage: 'Token issuer address',
  },
  tokenIssuerAddressTooltip: {
    id: `${scope}.tokenIssuerAddressTooltip`,
    defaultMessage:
      'The most frequent sender wallet at the start of the token distribution',
  },
  crowdsaleAddress: {
    id: `${scope}.crowdsaleAddress`,
    defaultMessage: 'Crowdsale address',
  },
  crowdsaleAddressTooltip: {
    id: `${scope}.crowdsaleAddressTooltip`,
    defaultMessage: 'The wallet address of the ICO public crowdsale',
  },
  version: {
    id: `${scope}.version`,
    defaultMessage: 'Version',
  },
  generalInformation: {
    id: `${scope}.generalInformation`,
    defaultMessage: 'General information',
  },
  icoDetails: {
    id: `${scope}.icoDetails`,
    defaultMessage: 'ICO details',
  },
  calculatedData: {
    id: `${scope}.calculatedData`,
    defaultMessage: 'Calculated data',
  },
  tokensCheck: {
    id: `${scope}.tokensCheck`,
    defaultMessage: 'Tokens check',
  },
  ethCheck: {
    id: `${scope}.ethCheck`,
    defaultMessage: 'ETH check',
  },
  metrics: {
    id: `${scope}.metrics`,
    defaultMessage: 'Metrics',
  },
  tokensIssued: {
    id: `${scope}.tokensIssued`,
    defaultMessage: 'Tokens issued',
  },
  efr_tokenTooltip: {
    id: `${scope}.efr_tokenTooltip`,
    defaultMessage:
      'An estimate of the funds raised, based on the number of tokens issued multiplied by ICO price',
  },
  efr_token: {
    id: `${scope}.efr_token`,
    defaultMessage: 'Estimated funds raised by tokens',
  },
  efr_token_adjustedTooltip: {
    id: `${scope}.efr_token_adjustedTooltip`,
    defaultMessage:
      'An estimate of the funds raised, based on the number of tokens issued multiplied by adjusted ICO price',
  },
  efr_token_adjusted: {
    id: `${scope}.efr_token_adjusted`,
    defaultMessage: 'Adjusted estimated funds raised by tokens',
  },
  fundsRaisedDiff: {
    id: `${scope}.fundsRaisedDiff`,
    defaultMessage: 'Funds raised difference',
  },
  fundsRaisedDiffTooltip: {
    id: `${scope}.fundsRaisedDiffTooltip`,
    defaultMessage:
      'The difference between reported funds raised and estimated funds raised by tokens (%)',
  },
  adjustedFundsRaisedDiff: {
    id: `${scope}.adjustedFundsRaisedDiff`,
    defaultMessage: 'Adjusted funds raised difference',
  },
  adjustedFundsRaisedDiffTooltip: {
    id: `${scope}.adjustedFundsRaisedDiffTooltip`,
    defaultMessage:
      'The difference between reported funds raised (adjusted to ETH) and adjusted estimated funds raised by tokens (%)',
  },
  ethRaised: {
    id: `${scope}.ethRaised`,
    defaultMessage: 'ETH raised',
  },
  ethRaisedTooltip: {
    id: `${scope}.ethRaisedTooltip`,
    defaultMessage: 'The total number of ETH sent to the ICO crowdsale address',
  },
  ico_eth_total: {
    id: `${scope}.ico_eth_total`,
    defaultMessage: 'Total ETH txs',
  },
  ico_eth_totalTooltip: {
    id: `${scope}.ico_eth_totalTooltip`,
    defaultMessage:
      'The total number of ETH transactions to the ICO crowdsale address',
  },
  ico_eth_in: {
    id: `${scope}.ico_eth_in`,
    defaultMessage: 'ETH raised',
  },
  ico_eth_inTooltip: {
    id: `${scope}.ico_eth_inTooltip`,
    defaultMessage: 'The total number of ETH sent to the ICO crowdsale address',
  },
  efr_ico_tx: {
    id: `${scope}.efr_ico_tx`,
    defaultMessage: 'Estimated funds raised by ETH',
  },
  efr_ico_txTooltip: {
    id: `${scope}.efr_ico_txTooltip`,
    defaultMessage:
      'An estimate of the funds raised, based on the transactions in ETH funds address',
  },
  distribution_days: {
    id: `${scope}.distribution_days`,
    defaultMessage: 'Distribution days',
  },
  distribution_daysTooltip: {
    id: `${scope}.distribution_daysTooltip`,
    defaultMessage: 'The total number of days when the tokens were distributed',
  },
  distribution_start_from_ico_start: {
    id: `${scope}.distribution_end_from_ico_end`,
    defaultMessage: 'Start date of token distribution',
  },
  distribution_start_from_ico_startTooltip: {
    id: `${scope}.distribution_end_from_ico_endTooltip`,
    defaultMessage:
      'The date when the first token was issued in comparison to ICO start date',
  },
  distribution_end_from_ico_end: {
    id: `${scope}.distribution_start_from_ico_start`,
    defaultMessage: 'End date of token distribution',
  },
  distribution_end_from_ico_endTooltip: {
    id: `${scope}.distribution_start_from_ico_startTooltip`,
    defaultMessage:
      'The date when the last token was issued in comparison to ICO end date',
  },
  funds_balance_eth: {
    id: `${scope}.funds_balance_eth`,
    defaultMessage: 'ETH balance',
  },
  funds_balance_ethTooltip: {
    id: `${scope}.funds_balance_ethTooltip`,
    defaultMessage: 'The amount of ETH in ETH funds address',
  },
  reanalyseTooltip: {
    id: `${scope}.reanalyseTooltip`,
    defaultMessage: 'The exact time depends on the Ethereum network load',
  },
  tokensCheckStatusTooltip: {
    id: `${scope}.passedTooltip`,
    defaultMessage:
      'The check passes when the difference between reported funds raised and estimated funds raised by tokens is no more than 10% in favor of the former. A larger difference may be accepted to account for ETH price fluctuations: e.g. up to 30% if the price drops by 30% in the course of the ICO.',
  },
  ethCheckStatusTooltip: {
    id: `${scope}.failedStatusTooltip`,
    defaultMessage:
      'The check passes when the difference between reported funds raised and estimated funds raised by ETH is no more than 10% in favor of the former. A larger difference may be accepted to account for ETH price fluctuations: e.g. up to 30% if the price drops by 30% in the course of the ICO.',
  },
  invalidPassportAddress: {
    id: `${scope}.invalidPassportAddress`,
    defaultMessage:
      'The ICO identity you are trying to access is incorrect. Please try again with a correct URL.',
  },
});

export const createCustomMessages = ({ icoName }) =>
  defineMessages({
    icoDetailsHeaderTooltip: {
      id: `${scope}.icoDetailsHeaderTooltip`,
      defaultMessage: `Data taken from the project’s icorating.com page https://icorating.com/ico/${icoName}.`,
    },
  });
