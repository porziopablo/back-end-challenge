// database connector
import db from '../db/index.js';

// queries
import {
  BEGIN_TRANSACTION,
  COMMIT_TRANSACTION,
  ROLLBACK_TRANSACTION,
  getProductStock,
  updateProductStock,
  insertOrderItem,
  checkIsValidShop,
  insertShippingOrder,
} from './queries.js';

/**
 * Inserts a new order item in the table.
 * @param {object} item to be inserted, with `productId` and `quantity` properties
 * @param {*} client the DB client to perform the insert with.
 * @param {*} orderId the order's id that the item belongs to.
 * @returns Promise<boolean> that once resolved will tell if the item was inserted or not.
 */
async function insertItem({ productId, quantity }, client, orderId) {
  let isInserted = false;

  // it checks that the product actually exists, and in that case it gets its stock.
  const { rows } = await client.query(getProductStock(productId));

  // if the product exists, is unique and the quantity is positive then it will proceed
  // else it will discard this item
  if (quantity > 0 && rows.length === 1) {
    const { stock } = rows[0];
    const newStock = quantity > stock ? 0 : stock - quantity;

    await client.query(updateProductStock(productId, newStock));
    await client.query(insertOrderItem(productId, orderId, quantity));

    isInserted = true;
  }

  return isInserted;
}

/**
 * Checks that a `locationId` actually belongs to an existing Shop and not a Warehouse
 * @param {*} locationId the id of the location to be checked.
 * @returns {Promise<boolean>} the Promise that once resolved will indicate if it's a
 * valid Shop or not
 */
export async function isValidShop(locationId) {
  const { rows } = await db.query(checkIsValidShop(locationId));
  return rows[0].exists;
}
/**
 * Inserts a new shipping order into the DB
 * @param {int} locationId identifies the Shop that is requesting the order
 * @param {Array} productsOrdered array that indicates which
 * products are needed, and the quantities for each one.
 * @returns an object with the `orderId` of the new order, its pending `status` and
 * a `products` array containing the ids of those products that were correctly ordered.
 */
export async function insertOrder(locationId, productsOrdered) {
  let orderId = 0;
  const insertedProductsIds = [];

  // this isn't inside try/catch because if the connection throws an exception
  // there is no need to dispose of the client (it'll be undefined)
  const client = await db.getClient();

  try {
    await client.query(BEGIN_TRANSACTION);

    // it creates the shipping order and gets its order_id
    const { rows: insertedRows } = await client.query(insertShippingOrder(locationId));
    orderId = insertedRows[0].order_id;

    await Promise.all(productsOrdered.map(async (orderItem) => {
      const isInserted = await insertItem(orderItem, client, orderId);
      if (isInserted) {
        insertedProductsIds.push(orderItem.productId);
      }
    }));

    if (insertedProductsIds.length) {
      await client.query(COMMIT_TRANSACTION);
    } else {
      await client.query(ROLLBACK_TRANSACTION);
    }
  } catch (error) {
    await client.query(ROLLBACK_TRANSACTION);
    throw error;
  } finally {
    client.release();
  }

  return {
    orderId,
    status: 'pending',
    insertedProductsIds,
  };
}
