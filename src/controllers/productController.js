// model
import selectProducts from '../models/product.js';

// status codes
import STATUS_CODES from '../routes/constants/statusCodes.js';

// messages
import { INTERNAL_ERROR_MSG } from './constants/errorMessages.js';

/**
 * A controller for the `product` route the request for getting all the products, or the ones made
 * by a particular brand.
 * @param request The request sent to the `product` route by `Express` .
 * @param response object provided by `Express`.
 */
async function getProducts(request, response) {
  const { brand } = request.query;

  try {
    const { rows } = await selectProducts(brand);
    const result = rows || [];

    response.send({ result });
  } catch (error) {
    response.status(STATUS_CODES.INTERNAL_SERVER_ERROR);
    response.send({ error: INTERNAL_ERROR_MSG });
  }
}

export default getProducts;
