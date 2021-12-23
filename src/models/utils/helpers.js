// constant
import { STATUS } from './constants.js';

/**
 * It returns the current status the order should have in order to update it.
 * It follows the precedence rules described in the API doc.
 * @param {string} newStatus the status the user wants to apply to the order.
 * @returns {string} the status it should currently have to do so. It returns `''` if
 * the `newStatus` doesn't exist or represents `PENDING` status.
 */
// eslint-disable-next-line import/prefer-default-export
export function currentStatusIdShouldBe(newStatus) {
  let currentStatus = '';

  switch (newStatus) {
    case STATUS.DELIVERED:
      currentStatus = STATUS.IN_PROGRESS; break;
    case STATUS.IN_PROGRESS:
      currentStatus = STATUS.PENDING; break;
    default:
      currentStatus = '';
  }

  return currentStatus;
}
