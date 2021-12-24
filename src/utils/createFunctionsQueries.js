export const createGetProductsFunction = `
  DROP FUNCTION IF EXISTS get_products;
  CREATE FUNCTION get_products(wanted_brand VARCHAR DEFAULT NULL)
  RETURNS TABLE (LIKE product)
  AS $$
    SELECT P.product_id, P.name, P.brand, P.description, P.stock FROM product P
    WHERE ( wanted_brand IS NULL OR LOWER(P.brand) = wanted_brand );
  $$  LANGUAGE sql;
`;

export const createGetUndeliveredOrdersFunction = `
  DROP FUNCTION IF EXISTS getUndeliveredOrders;
  CREATE FUNCTION getUndeliveredOrders()
  RETURNS TABLE (order_id INT, created_date TIMESTAMPTZ, last_update TIMESTAMPTZ,
    description VARCHAR, name VARCHAR, city VARCHAR, address VARCHAR, location_id INT)
  AS $$
    SELECT S.order_id, S.created_date, S.last_update, ST.description,
      L.name, L.city, L.address, L.location_id
    FROM shipping_order S
    INNER JOIN location L
    ON L.location_id = S.location_id
    INNER JOIN status ST
    ON S.status_id = ST.status_id
    WHERE ST.description = 'PENDING' OR ST.description = 'IN_PROGRESS'
    ORDER BY S.last_update;
  $$  LANGUAGE sql;
`;

export const createGetInProgressOrderFunction = `
  DROP FUNCTION IF EXISTS getInProgressOrder;
  CREATE FUNCTION getInProgressOrder(wantedOrderId INT)
  RETURNS TABLE (created_date TIMESTAMPTZ, name VARCHAR, city VARCHAR, address VARCHAR,
    location_id INT)
  AS $$
    SELECT S.created_date, L.name, L.city, L.address, L.location_id
    FROM shipping_order S
    INNER JOIN location L
    ON L.location_id = S.location_id
    WHERE S.order_id = wantedOrderId
  $$  LANGUAGE sql;
`;
