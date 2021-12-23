// database connector
import db from '../db/index.js';

// queries
import { getProducts } from './utils/queries.js';

/**
 * It requests the DB all the products, with the ability to filter them by brand.
 * @param {string | null} brand the brand of the products that should be returned from the DB
 * @returns {Promise<QueryResult<any>>} a promise for the DB query.
 */
function selectProducts(brand) {
  return db.query(getProducts(brand ? brand.toLowerCase() : null));
}

export default selectProducts;
