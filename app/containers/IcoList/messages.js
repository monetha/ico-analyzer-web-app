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
      'Monetha’s and ICO’s Analyzer aggregates and analyzes the main information about ICOs to estimate the amount of funds they have raised. It then stores the data in a decentralized reputation passport on the blockchain. This allows anyone interested to verify an ICO&apos;s performance in an objective and censorship-resistant manner. The project showcases Monetha Reputation Framework–its Payments and Reputation layers–in action.',
  },
  analyzerFooter: {
    id: `${scope}.analyzerFooter`,
    defaultMessage:
      'The information contained on this website is provided for informative purposes and should not be considered as investment or any other kind of advice or recommendation.',
  },
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Analyzed ICOs',
  },
  footer: {
    id: `${scope}.footer`,
    defaultMessage: 'Powered by Monetha Reputation Framework (TUMAS)',
  },
  fetchingListDataLoaderMessage: {
    id: `${scope}.fetchingListDataLoaderMessage`,
    defaultMessage:
      'Fetching data from the blockchain. This might take a few moments',
  },
});
