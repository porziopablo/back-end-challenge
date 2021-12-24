/* eslint-disable no-console */
// database connector
import db from '../db/index.js';

// queries
import {
  createLocationTypeTable,
  createRoleTable,
  createStatusTable,
  createLocationTable,
  createEmployeeTable,
  createShippingOrderTable,
  createProductTable,
  createOrderItemTable,
  deleteTable,
} from './createDeleteTableQueries.js';
import {
  seedLocationTypeTable,
  seedRoleTable,
  seedStatusTable,
  seedLocationTable,
  seedEmployeeTable,
  seedProductTable,
} from './seedTableQueries.js';
import {
  createGetInProgressOrderFunction,
  createGetProductsFunction,
  createGetUndeliveredOrdersFunction,
} from './createFunctionsQueries.js';

/**
 * It drops all the tables, creates them again, and seed some of them with
 * initial values. It also creates DB functions and stored procedures.
 */
async function seed() {
  try {
    console.log('Seeding in progress...\n');

    console.log('Deleting existing tables...\n');
    await db.query(deleteTable('order_item'));
    await db.query(deleteTable('shipping_order'));
    await db.query(deleteTable('product'));
    await db.query(deleteTable('employee'));
    await db.query(deleteTable('location'));
    await db.query(deleteTable('role'));
    await db.query(deleteTable('status'));
    await db.query(deleteTable('location_type'));

    console.log('Creating tables...\n');
    await db.query(createLocationTypeTable);
    await db.query(createStatusTable);
    await db.query(createRoleTable);

    await db.query(createLocationTable);
    await db.query(createEmployeeTable);
    await db.query(createProductTable);
    await db.query(createShippingOrderTable);
    await db.query(createOrderItemTable);

    console.log('Seeding tables...\n');
    await db.query(seedLocationTypeTable);
    await db.query(seedRoleTable);
    await db.query(seedStatusTable);

    await db.query(seedLocationTable);
    await db.query(seedEmployeeTable);
    await db.query(seedProductTable);

    console.log('Creating functions and stored procedures...\n');
    await db.query(createGetProductsFunction);
    await db.query(createGetUndeliveredOrdersFunction);
    await db.query(createGetInProgressOrderFunction);

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.log('Aborting - error while seeding:', error);
  } finally {
    db.end('DB pool closed');
  }
}

seed();
