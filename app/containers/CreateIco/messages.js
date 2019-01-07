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
    defaultMessage: 'Create a new ICO passport',
  },
  createMessage: {
    id: `${scope}.createMessage`,
    defaultMessage:
      'To create an ICO passport, you will have to pay a small transaction fee. It is needed to cover the expenses for deploying a smart contract on the blockchain. Afterwards, you will be able to enter data and start the analysis.',
  },
  createButtonText: {
    id: `${scope}.createText`,
    defaultMessage: 'Create Pass',
  },
  backButtonText: {
    id: `${scope}.backButtonText`,
    defaultMessage: 'Back',
  },
  createSuccess: {
    id: `${scope}.createSuccess`,
    defaultMessage:
      'Congratulations, your passport is sucessfully created at address. You will be redirect to analyse page shortly.',
  },
  icoLoadingMessage: {
    id: `${scope}.icoLoadingMessage`,
    defaultMessage:
      'We are creating ICO passport, it can take few moments. \nThe exact time depends on the Ethereum network load',
  },
  connectToMetamaskMessage: {
    id: `${scope}.connectToMetamaskMessage`,
    defaultMessage:
      'Please allow monetha to connect with your metamask account to create a passport',
  },
  confirmPassCreationInMetamask: {
    id: `${scope}.confirmPassCreationInMetamask`,
    defaultMessage: 'Please confirm passport creation transaction in metamask',
  },
});

export const createCustomMessages = ({ passportAddress, timeout }) =>
  defineMessages({
    createSuccess: {
      id: `${scope}.createSuccess`,
      defaultMessage: `The passport has been successfully created at address ${passportAddress}. You will be redirected to Analyze ICO page in ${timeout}.`,
    },
  });
