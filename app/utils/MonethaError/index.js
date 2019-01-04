import errors from './errors';

class MonethaError extends Error {
  type;

  message;

  formattedMessage;

  constructor(error) {
    super(error);
    let knownMonethaError = errors[error.message];

    if (!knownMonethaError) {
      knownMonethaError = errors['Unknown Error'];
    }

    this.type = knownMonethaError.type;
    this.message = knownMonethaError.message;
    this.formattedMessage = knownMonethaError.formattedMessage;
  }
}

export default MonethaError;
