// model
import {
  getInProgressOrder,
  getNotDeliveredOrders,
  insertOrder,
  isValidShop,
  setNewOrderStatus,
} from '../models/order.js';

// constants
import { STATUS } from '../models/utils/constants.js';

// status codes
import STATUS_CODES from '../routes/constants/statusCodes.js';

// messages
import {
  INTERNAL_ERROR_MSG,
  INVALID_SHOP_MSG,
  NO_MSG_SENT,
  NO_UPDATED_STATUS,
  NO_VALID_PRODUCTS_MSG,
} from './constants/errorMessages.js';

// queue connector
import sendMessage from '../dispatch/queueConnector.js';

/**
 * Controller that creates a new order for the Warehouse
 * @param {*} request request object provided by `Express`. It must have a `body` property
 * with `locationId` integer and `products` array properties. The elements in this array are of type
 * `{ productId: int, quantity: int }`
 * @param {*} response response object provided by `Express`.
 */
export async function createOrder(request, response) {
  const { locationId, products } = request.body;

  try {
    const validShop = await isValidShop(locationId);

    if (validShop) {
      const result = await insertOrder(locationId, products);

      if (result.insertedProductsIds.length) {
        response.send({ result });
      } else {
        response.status(STATUS_CODES.BAD_REQUEST);
        response.send({ error: NO_VALID_PRODUCTS_MSG });
      }
    } else {
      response.status(STATUS_CODES.BAD_REQUEST);
      response.send({ error: INVALID_SHOP_MSG(locationId) });
    }
  } catch (error) {
    response.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    response.send({ error: INTERNAL_ERROR_MSG });
  }
}

/**
 * Controller that returns all the pending or in progress orders sorted by
 * last update date.
 * @param {*} response response object provided by `Express`.
 */
export async function getOrders(response) {
  try {
    const orders = await getNotDeliveredOrders();
    const result = orders || [];

    response.send({ result });
  } catch (error) {
    response.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    response.send({ error: INTERNAL_ERROR_MSG });
  }
}

/**
 * Sends an `IN_PROGRESS` order to the dispatch queue.
 * @param {int} orderId of the order to be sent.
 */
async function sendInProgressOrder(orderId) {
  try {
    const order = await getInProgressOrder(orderId);
    sendMessage(JSON.stringify(order));
  } catch (error) {
    // this error shouldn't be sent to the client as the order
    // was updated successfully. The issue happened internally.
    // eslint-disable-next-line no-console
    console.log(NO_MSG_SENT, error);
  }
}

/**
 * Controller that updates the status of an order.
 * @param {*} request request object provided by `Express`. It must include in its query
 * parameters the desired `statusId` and the `orderId`.
 * @param {*} response response object provided by `Express`.
 */
export async function updateOrderStatus(request, response) {
  const { orderId, statusId } = request.query;

  try {
    const result = await setNewOrderStatus(parseInt(orderId, 10) || 0, parseInt(statusId, 10) || 0);

    if (result) {
      response.send({ result: true });
      if (result === STATUS.IN_PROGRESS) {
        sendInProgressOrder(orderId);
      }
    } else {
      response.status(STATUS_CODES.BAD_REQUEST);
      response.send({ error: NO_UPDATED_STATUS });
    }
  } catch (error) {
    response.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    response.send({ error: INTERNAL_ERROR_MSG });
  }
}
