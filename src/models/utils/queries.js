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

export function selectNotDeliveredOrders() {
  return `
    SELECT S.order_id, S.created_date, S.last_update, S.description,
           S.name, S.city, S.address, S.location_id
    FROM getUndeliveredOrders() S;
  `;
}

export function selectOrderItems(orderId) {
  return {
    text: `
      SELECT O.product_id, O.quantity
      FROM order_item O
      WHERE O.order_id = $1;
    `,
    values: [orderId],
  };
}

export function updateOrderStatus(orderId, newStatus, currentStatus) {
  const now = new Date();

  return {
    text: `
      UPDATE shipping_order O
      SET status_id = $1, last_update = $2
      FROM status S
      WHERE O.order_id = $3 AND O.status_id = S.status_id AND S.description = $4
      RETURNING order_id;
    `,
    values: [newStatus, now, orderId, currentStatus],
  };
}

export function selectRoleDescription(roleId) {
  return {
    text: `
      SELECT R.description
      FROM role R
      WHERE R.role_id = $1;
    `,
    values: [roleId],
  };
}

export function selectStatusDescription(statusId) {
  return {
    text: `
      SELECT S.description
      FROM status S
      WHERE S.status_id = $1;
    `,
    values: [statusId],
  };
}

export function getProducts(brand) {
  return {
    text: `
      SELECT P.product_id, P.name, P.brand, P.description, P.stock
      FROM get_products($1) P;
    `,
    values: [brand],
  };
}
