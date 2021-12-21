// routers
import productRouter from './product.js';
import orderRouter from './order.js';

// routes
import { PRODUCT_ROUTES, ORDER_ROUTES } from './constants/routes.js';

/**
 * It mounts all the server routers on an `Express` app.
 * @param {*} app the app on which the routers will be mounted on.
 */
function mountRoutes(app) {
  app.use(PRODUCT_ROUTES.ROOT, productRouter);
  app.use(ORDER_ROUTES.ROOT, orderRouter);
}

export default mountRoutes;
