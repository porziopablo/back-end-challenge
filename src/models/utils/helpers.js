/**
 * It returns the current statusId the order should have in order to update it.
 * It follows the precedence rules described in the API doc.
 * @param {int} newStatusId the statusId the user wants to apply to the order.
 * @returns {int} the statusId it should currently have to do so. It returns `0` if
 * the `newStatusId` doesn't exist or representes `pending` status.
 */
// eslint-disable-next-line import/prefer-default-export
export function currentStatusIdShouldBe(newStatusId) {
  let currentStatus = 0;

  switch (newStatusId) {
    case 3:
      currentStatus = 2; break;
    case 2:
      currentStatus = 1; break;
    default:
      currentStatus = 0;
  }

  return currentStatus;
}
