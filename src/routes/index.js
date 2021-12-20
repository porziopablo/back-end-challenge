// routers
import productRouter from './product.js';

/**
 * It mounts all the server routers on an `Express` app.
 * @param {*} app the app on which the routers will be mounted on.
 */
function mountRoutes(app) {
  app.use('/product', productRouter);
}

export default mountRoutes;
