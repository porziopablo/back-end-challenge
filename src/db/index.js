// vendors
import pg from 'pg';

// config
import config from '../config.js';

const pool = new pg.Pool({ connectionString: config.DB_URL });

// eslint-disable-next-line no-console
pool.on('error', (error) => console.log('DB pool error:', error));

const db = {
  /**
   * Executes an SQL query in the DB.
   * @param {string} queryString the SQL query to be executed.
   * @param {*} parameters the parameters for the query.
   * @returns a Promise to execute the query.
   */
  query: (queryString, parameters) => pool.query(queryString, parameters),
  /**
   * Ends the client pool for the DB. It is common to call this at the end of
   * a script using the pool or when your process is attempting to shut down cleanly.
   * @param {*} message to be shown once the pool has ended.
   */
  // eslint-disable-next-line no-console
  end: (message) => pool.end(() => { console.log(message); }),
  /**
   * Acquires a client from the pool.Once is not longer needed call
   * `client.release()` to free it.
   * @returns {Promise<pg.PoolClient>} a Promise to deliver a client.
   */
  getClient: () => pool.connect(),
};

export default db;
