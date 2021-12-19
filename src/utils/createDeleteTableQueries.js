export const createRoleTable = `
  DROP TABLE IF EXISTS role;
  CREATE TABLE IF NOT EXISTS role (
    role_id SERIAL PRIMARY KEY,
    description VARCHAR(30)
  )
`;

export const createLocationTypeTable = `
  DROP TABLE IF EXISTS location_type;
  CREATE TABLE IF NOT EXISTS location_type (
    type_id SERIAL PRIMARY KEY,
    description VARCHAR(30)
  )
`;

export const createStatusTable = `
  DROP TABLE IF EXISTS status;
  CREATE TABLE IF NOT EXISTS status (
    status_id SERIAL PRIMARY KEY,
    description VARCHAR(30)
  )
`;

export const createLocationTable = `
  DROP TABLE IF EXISTS location;
  CREATE TABLE IF NOT EXISTS location (
    location_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    city VARCHAR(30),
    address VARCHAR(30),
    type_id INTEGER REFERENCES location_type(type_id)
  )
`;

export const createEmployeeTable = `
  DROP TABLE IF EXISTS employee;
  CREATE TABLE IF NOT EXISTS employee (
    employee_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    password VARCHAR(30),
    location_id INTEGER REFERENCES location(location_id),
    role_id INTEGER REFERENCES role(role_id)
  )
`;

export const createShippingOrderTable = `
  DROP TABLE IF EXISTS shipping_order;
  CREATE TABLE IF NOT EXISTS shipping_order (
    order_id SERIAL PRIMARY KEY,
    created_date TIMESTAMP,
    last_update TIMESTAMP,
    location_id INTEGER REFERENCES location(location_id),
    status_id INTEGER REFERENCES status(status_id)
  )
`;

export const createProductTable = `
  DROP TABLE IF EXISTS product;
  CREATE TABLE IF NOT EXISTS product (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    brand VARCHAR(30),
    description VARCHAR(100),
    stock INTEGER CHECK (stock >= 0)
  )
`;

export const createOrderItemTable = `
  DROP TABLE IF EXISTS order_item;
  CREATE TABLE IF NOT EXISTS order_item (
    product_id INTEGER REFERENCES product(product_id),
    order_id INTEGER REFERENCES shipping_order(order_id),
    quantity INTEGER CHECK (quantity > 0),
    PRIMARY KEY(product_id, order_id)
  )
`;

/**
 * Creates a SQL query to drop a table if it exists.
 * @param {string} tableName the table's name in the DB.
 * @returns the SQL query string.
 */
export const deleteTable = (tableName) => `
  DROP TABLE IF EXISTS ${tableName};
`;
