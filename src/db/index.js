// vendors
import pg from 'pg';

// config
import config from '../config.js';

const pool = new pg.Pool({ connectionString: config.DB_URL });

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
  end: (message) => pool.end(() => { console.log(message); }),
};

export default db;
