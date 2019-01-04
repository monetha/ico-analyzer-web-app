import { STATUS_PASSED, STATUS_FAILED } from './constants';

/**
 * hasTxSucceed takes txResultBlock and returns bool true for succeed Tx.
 *
 * @param {JSON} resultBlock transaction result block
 */
export const hasTxSucceed = resultBlock => resultBlock.status === STATUS_PASSED;

/**
 * hasTxFailed takes txResultBlock and returns bool true for failed Tx.
 *
 * @param {JSON} resultBlock transaction result block
 */
export const hasTxFailed = resultBlock => resultBlock.status === STATUS_FAILED;
