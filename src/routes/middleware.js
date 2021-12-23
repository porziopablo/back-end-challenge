// vendors
import jwtDecode from 'jwt-decode';

// config
import config from '../config.js';

// constants
import STATUS_CODES from './constants/statusCodes.js';
import { FORBIDDEN_MSG, NOT_FOUND_MSG } from './constants/errorMessages.js';

const AUTH_SCHEME = 'Bearer';

/**
 * It returns the payload from a `JWT` token inside the `authorizationHeader` string.
 * @param {string} authorizationHeader `HTTP` authorization header string, `Bearer` type.
 * @returns {object} payload from a `JWT` token.
 */
function getPayload(authorizationHeader) {
  const token = authorizationHeader.replace(`${AUTH_SCHEME} `, '');

  return jwtDecode(token);
}

/**
 * Middleware that manages user's authentication using `JWT` tokens. It must be
 * added to the `Express` `app` before declaring any route.
 * @param {*} request provided by `Express`.
 * @param {*} response provided by `Express`.
 * @param {*} next provided by `Express`.
 */
export function authorizationMiddleware(request, response, next) {
  const authorizationHeader = request.headers.authorization || '';
  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== AUTH_SCHEME || token !== config.MOCKED_JWT_TOKEN) {
    response
      .status(STATUS_CODES.NOT_FOUND)
      .send({ error: NOT_FOUND_MSG });
  } else {
    next();
  }
}

/**
 * Middleware that checks if the user has permissions for accesing a resource or
 * action based on the role declared in its auth token and the `expectedUserRole`'s
 * @param {*} request provided by `Express`.
 * @param {*} response provided by `Express`.
 * @param {*} next provided by `Express`.
 * @param {Array} expectedUserRole array containing the roles that are allowed.
 */
export function permissionsMiddleware(request, response, next, expectedUserRole) {
  const payload = getPayload(request.headers.authorization || '');

  if (!expectedUserRole.includes(payload.role)) {
    response
      .status(STATUS_CODES.FORBIDDEN)
      .send({ error: FORBIDDEN_MSG(payload.role) });
  } else {
    next();
  }
}

/**
 * Specific middleware that checks if the user is allowed to change an order's status
 * based on the role and the desired status.
 * @param {*} request provided by `Express`.
 * @param {*} response provided by `Express`.
 * @param {*} next provided by `Express`.
 */
export function updateStatusMiddleware(request, response, next) {
  const { headers, query } = request;
  const payload = getPayload(headers.authorization || '');
  const role = parseInt(payload.role, 10);
  let isRoleAllowed = false;

  switch (parseInt(query.statusId, 10)) {
    case 3:
      isRoleAllowed = role === 1; break;
    case 2:
      isRoleAllowed = role === 2; break;
    default:
      isRoleAllowed = false;
  }

  if (!isRoleAllowed) {
    response
      .status(STATUS_CODES.FORBIDDEN)
      .send({ error: FORBIDDEN_MSG(payload.role) });
  } else {
    next();
  }
}

/**
 * Middleware that returns standard 404 response for non-existent resources/actions
 * It must be placed at the bottom of the `Express` stack. `Express` will default to
 * this after trying everything else.
 * @param {*} response provided by `Express`.
 */
export function notFoundMiddleware(response) {
  response
    .status(STATUS_CODES.FORBIDDEN)
    .send({ error: NOT_FOUND_MSG });
}
