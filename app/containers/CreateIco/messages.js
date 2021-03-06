/*
 * CreateIco Messages
 *
 * This contains all the text for the CreateIco container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.CreateIco';

export default defineMessages({
  privateKeyLabel: {
    id: `${scope}.privateKeyLabel`,
    defaultMessage: 'Private Key',
  },
  privateKeyPlaceholder: {
    id: `${scope}.privateKeyPlaceholder`,
    defaultMessage: 'Enter your private key here',
  },
  createHeader: {
    id: `${scope}.createHeader`,
    defaultMessage: 'Create a new ICO Identity',
  },
  createMessage: {
    id: `${scope}.createMessage`,
    defaultMessage:
      'To create an ICO Identity, you will have to pay a small transaction fee. It is needed to cover the expenses for deploying a smart contract on the blockchain. Afterwards, you will be able to enter data and start the analysis.',
  },
  paybackAfterPayment: {
    id: `${scope}.paybackAfterPayment`,
    defaultMessage:
      'You will also receive some MTH vouchers to your wallet address. They can be used for discounts in the Monetha ecosystem.',
  },
  createButtonText: {
    id: `${scope}.createText`,
    defaultMessage: 'Create',
  },
  backButtonText: {
    id: `${scope}.backButtonText`,
    defaultMessage: 'Back',
  },
  createSuccess: {
    id: `${scope}.createSuccess`,
    defaultMessage:
      'Congratulations, your identity is sucessfully created at address. You will be redirect to analyse page shortly.',
  },
  icoLoadingMessage: {
    id: `${scope}.icoLoadingMessage`,
    defaultMessage:
      'We are creating ICO Identity, it can take few moments. \nThe exact time depends on the Ethereum network load',
  },
  connectToMetamaskMessage: {
    id: `${scope}.connectToMetamaskMessage`,
    defaultMessage:
      'Please allow monetha to connect with your metamask account to create an identity',
  },
  confirmPassCreationInMetamask: {
    id: `${scope}.confirmPassCreationInMetamask`,
    defaultMessage: 'Please confirm identity creation transaction in metamask',
  },
});

export const createCustomMessages = ({ passportAddress, timeout }) =>
  defineMessages({
    createSuccess: {
      id: `${scope}.createSuccess`,
      defaultMessage: `The identity has been successfully created at address ${passportAddress}. You will be redirected to Analyze ICO page in ${timeout}.`,
    },
  });
