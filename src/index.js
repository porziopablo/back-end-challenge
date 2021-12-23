// vendors
import express from 'express';

// set-up
import config from './config.js';
import mountRoutes from './routes/index.js';
import { authorizationMiddleware, notFoundMiddleware } from './routes/middleware.js';

const app = express();

/*                          Express Stack - Top                         */

// add middleware to be used by all routes here
app.use(authorizationMiddleware);
app.use(express.json());

// add routes here
mountRoutes(app);

// middleware for 404s must be at the bottom
app.use((request, response) => { notFoundMiddleware(response); });

/*                          Express Stack - Bottom                       */

app.listen(config.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\nServer is listening on port ${config.SERVER_PORT}\n`);
});
