import messages from './messages';
import {
  TX_REJECTED,
  VALIDATION_FAILED,
  NETWORK_ERROR,
  UNKNOWN_ERROR,
  INVALID_PRIVATE_KEY,
} from './constants';

export const errors = {
  [TX_REJECTED]: {
    type: 'TX_REJECTED',
    message: TX_REJECTED,
    formattedMessage: messages.txRejected,
  },
  [VALIDATION_FAILED]: {
    type: 'VALIDATION_FAILED',
    message: VALIDATION_FAILED,
    formattedMessage: messages.validationError,
  },
  [NETWORK_ERROR]: {
    type: 'NETWORK_ERROR',
    message: NETWORK_ERROR,
    formattedMessage: messages.networkError,
  },
  [INVALID_PRIVATE_KEY]: {
    type: 'INVALID_PRIVATE_KEY',
    message: INVALID_PRIVATE_KEY,
    formattedMessage: messages.invalidPrivateKey,
  },
  [UNKNOWN_ERROR]: {
    type: 'UNKNOWN_ERROR',
    message: UNKNOWN_ERROR,
    formattedMessage: messages.unknownError,
  },
};

export default errors;
