/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'ico-pass/Component' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 */

export const START_LOADER = 'app/App/START_LOADER';

export const STOP_LOADER = 'app/App/STOP_LOADER';

export const ADD_TO_CLIPBOARD = 'app/App/ADD_TO_CLIPBOARD';

export const SHOW_COPY_TO_CLIPBOARD = 'app/App/SHOW_COPY_TO_CLIPBOARD';

export const HIDE_COPY_TO_CLIPBOARD = 'app/App/HIDE_COPY_TO_CLIPBOARD';

export const MAINNET_URL =
  'https://mainnet.infura.io/v3/1f09dda6cce44da68213cacb1ea9bb90';
export const ROPSTEN_URL =
  'https://ropsten.infura.io/v3/1f09dda6cce44da68213cacb1ea9bb90';
export const NETWORK = ROPSTEN_URL;

export const FACT_PROVIDER_ADDRESS =
  '0x57c631BaAF2703224CFdA0c70ec7326C247d7E0D';

export const FACT_KEY = 'ICO Data';

export const SET_METAMASK_ENABLED = 'app/App/SET_METAMASK_ENABLED';

export const ENABLE_METAMASK_REQUEST = 'app/App/ENABLE_METAMASK_REQUEST';

export const ENABLE_METAMASK_SUCCESS = 'app/App/ENABLE_METAMASK_SUCCESS';

export const ENABLE_METAMASK_FAILURE = 'app/App/ENABLE_METAMASK_FAILURE';
