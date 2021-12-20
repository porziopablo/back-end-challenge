// database connector
import db from '../db/index.js';

/**
 * It requests the DB all the products, with the ability to filter them by brand.
 * @param {string | null} brand the brand of the products that should be returned from the DB
 * @returns {Promise<QueryResult<any>>} a promise for the DB query.
 */
function selectProducts(brand) {
  const query = {
    text: `
      SELECT P.product_id, P.name, P.brand, P.description, P.stock
      FROM get_products($1) P;
    `,
    values: [brand ? brand.toLowerCase() : null],
  };

  return db.query(query);
}

export default selectProducts;
