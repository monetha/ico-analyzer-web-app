/*
 * Header Messages
 *
 * This contains all the text for the Header component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Header';

export default defineMessages({
  createButtonText: {
    id: `${scope}.create-button-text`,
    defaultMessage: 'Analyze ICO',
  },
  listButtonText: {
    id: `${scope}.list-button-text`,
    defaultMessage: 'Back to list',
  },
  headerText: {
    id: `${scope}.headerText`,
    defaultMessage: 'ICO Analyzer',
  },
});
