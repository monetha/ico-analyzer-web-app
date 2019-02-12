/*
 * IcoList Messages
 *
 * This contains all the text for the IcoList container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.IcoList';

export default defineMessages({
  icoAnalyzer: {
    id: `${scope}.icoAnalyzer`,
    defaultMessage: 'ICO Analyzer',
  },
  analyzerContent: {
    id: `${scope}.analyzerContent`,
    defaultMessage:
      'Find out the status of your favorite ICO project! Verify its performance in an objective and censorship resistant manner.',
  },
  icoNameTooltip: {
    id: `${scope}.icoNameTooltip`,
    defaultMessage:
      'We take data from icorating.com, so the project’s name should match its URL: e. g. monetha-mth for Monetha',
  },
  analyzerFooter: {
    id: `${scope}.analyzerFooter`,
    defaultMessage:
      'DISCLAIMER: The information contained on this website is provided for informative purposes and should not be considered as investment or any other kind of advice or recommendation.',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Analyzed ICOs',
  },
  footer: {
    id: `${scope}.footer`,
    defaultMessage: 'Powered by Monetha Reputation Framework',
  },
  fetchingListDataLoaderMessage: {
    id: `${scope}.fetchingListDataLoaderMessage`,
    defaultMessage:
      'Fetching data from the blockchain. \nThis might take a few moments',
  },
  paybackDescription: {
    id: `${scope}.paybackDescription`,
    defaultMessage:
      'You will also receive some MTH vouchers to your wallet address',
  },
});
