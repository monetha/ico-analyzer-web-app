import { defineMessages } from 'react-intl';

export const scope = 'app.monetha.Erros';

const messages = defineMessages({
  txRejected: {
    id: `${scope}.txRejected`,
    defaultMessage: 'You have rejected the transaction request',
  },
  validationError: {
    id: `${scope}.validationError`,
    defaultMessage: 'Please fill all the required fields with appropriate data',
  },
  networkError: {
    id: `${scope}.networkError`,
    defaultMessage:
      'There is an issue with the network services, we are working on it',
  },
  invalidPrivateKey: {
    id: `${scope}.invalidPrivateKey`,
    defaultMessage: 'You hvae provided an invalid private key',
  },
  unknownError: {
    id: `${scope}.unknownError`,
    defaultMessage:
      'There is some issue with the services, we are working on it',
  },
});

export default messages;
