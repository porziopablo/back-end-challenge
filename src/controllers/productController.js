// model
import selectProducts from '../models/product.js';

/**
 * A controller for the `product` route that handles all the requests it receives.
 * @param request The request sent to the `product` route.
 * @param {Array} result An array containing an object for each product that matches
 * the request. All the `product` properties are returned.
 */
function getProducts(request, result, next) {
  const { brand } = request.query;

  selectProducts(brand)
    .then(({ rows }) => result.send(rows))
    .catch(next);
}

export default getProducts;
