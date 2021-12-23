// database connector
import db from '../db/index.js';

/**
 * It returns the role's description associated with a role's id
 * @param {int} roleId the id of the role which description is needed.
 * @returns the role's description if found, else undefined or an empty string.
 */
export async function getRoleDescription(roleId) {
  const query = {
    text: `
      SELECT R.description
      FROM role R
      WHERE R.role_id = $1;
    `,
    values: [roleId || 0],
  };

  const { rows } = await db.query(query);
  const roleDescription = rows[0] ? rows[0].description : '';

  return roleDescription;
}

/**
 * It returns the status' description associated with a status' id
 * @param {int} statusId the id of the status which description is needed.
 * @returns the status' description if found, else undefined or an empty string.
 */
export async function getStatusDescription(statusId) {
  const query = {
    text: `
      SELECT S.description
      FROM status S
      WHERE S.status_id = $1;
    `,
    values: [statusId || 0],
  };

  const { rows } = await db.query(query);
  const statusDescription = rows[0] ? rows[0].description : '';

  return statusDescription;
}
