// vendors
import express from 'express';

// set-up
import config from './config.js';
import mountRoutes from './routes/index.js';
import { authorizationMiddleware } from './routes/middleware.js';

const app = express();

app.use(authorizationMiddleware);
app.use(express.json());

mountRoutes(app);

app.listen(config.SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`\nServer is listening on port ${config.SERVER_PORT}\n`);
});
