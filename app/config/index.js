import * as production from './production';
import * as development from './development';

const isProduction = process.env.NODE_ENV === 'production';

const config = {
  FACT_KEY: 'ICO Data',
  COOKIE_POLICY_STORAGE_KEY: 'cookie_policy_accepted',

  PROVIDER_URL: isProduction
    ? production.PROVIDER_URL
    : development.PROVIDER_URL,

  PAYMENT_PROCESSOR_ADDRESS: isProduction
    ? production.PAYMENT_PROCESSOR_ADDRESS
    : development.PAYMENT_PROCESSOR_ADDRESS,

  PASSPORT_FACTORY_ADDRESS: isProduction
    ? production.PASSPORT_FACTORY_ADDRESS
    : development.PASSPORT_FACTORY_ADDRESS,

  FACT_PROVIDER_ADDRESS: isProduction
    ? production.FACT_PROVIDER_ADDRESS
    : development.FACT_PROVIDER_ADDRESS,

  PASSPORT_FACTORY_START_BLOCK: isProduction
    ? production.PASSPORT_FACTORY_START_BLOCK
    : development.PASSPORT_FACTORY_START_BLOCK,
};

export default config;
