// model
import { insertOrder, isValidShop } from '../models/order.js';

// status codes
import STATUS_CODES from '../routes/constants/statusCodes.js';

// messages
import {
  INTERNAL_ERROR_MSG,
  INVALID_SHOP_MSG,
  NO_VALID_PRODUCTS_MSG,
} from './constants/errorMessages.js';

/**
 * Controller that creates a new order for the Warehouse
 * @param {*} request request object provided by `Express`. It must have a `body` property
 * with `locationId` integer and `products` array properties. The elements in this array are of type
 * `{ productId: int, quantity: int }`
 * @param {*} response response object provided by `Express`.
 */
async function createOrder(request, response) {
  const { locationId, products } = request.body;

  try {
    const validShop = await isValidShop(locationId);

    if (validShop) {
      const result = await insertOrder(locationId, products);

      if (result.insertedProductsIds.length) {
        response.send({ result });
      } else {
        response.status(400);
        response.send({
          error: NO_VALID_PRODUCTS_MSG,
        });
      }
    } else {
      response.status(STATUS_CODES.BAD_REQUEST);
      response.send({
        error: INVALID_SHOP_MSG(locationId),
      });
    }
  } catch (error) {
    response.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    response.send({
      error: INTERNAL_ERROR_MSG,
    });
  }
}

export default createOrder;
