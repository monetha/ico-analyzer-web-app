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
    defaultMessage: 'Create ICO Pass',
  },
  listButtonText: {
    id: `${scope}.list-button-text`,
    defaultMessage: 'List of ICOs',
  },
  headerText: {
    id: `${scope}.headerText`,
    defaultMessage: 'ICO Analyzer',
  },
});
