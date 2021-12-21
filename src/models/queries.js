export const BEGIN_TRANSACTION = 'BEGIN;';
export const COMMIT_TRANSACTION = 'COMMIT;';
export const ROLLBACK_TRANSACTION = 'ROLLBACK;';

export function getProductStock(productId) {
  return {
    text: `
      SELECT P.stock FROM product P
      WHERE P.product_id = $1
    `,
    values: [productId],
  };
}

export function updateProductStock(productId, newStock) {
  return {
    text: `
      UPDATE product
      SET stock = $1
      WHERE product_id = $2
    `,
    values: [newStock, productId],
  };
}

export function insertOrderItem(productId, orderId, quantity) {
  return {
    text: `
      INSERT INTO order_item(product_id, order_id, quantity)
      VALUES ($1, $2, $3)
    `,
    values: [productId, orderId, quantity],
  };
}

export function checkIsValidShop(locationId) {
  return {
    text: `
      SELECT EXISTS(
        SELECT * FROM location L
        WHERE L.location_id = $1 AND L.type_id = 1
      )
    `,
    values: [locationId],
  };
}

export function insertShippingOrder(locationId) {
  const now = new Date();

  return {
    text: `
      INSERT INTO shipping_order(created_date, last_update, status_id, location_id)
      VALUES ($1, $2, 1, $3)
      RETURNING order_id
    `,
    values: [now, now, locationId],
  };
}
