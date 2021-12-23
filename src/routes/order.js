// vendors
import { Router } from 'express';

// controllers
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

// constants
import { ROLE } from '../models/utils/constants.js';

// routes
import { ORDER_ROUTES } from './constants/routes.js';

// middleware
import { permissionsMiddleware, updateStatusMiddleware } from './middleware.js';

const orderRouter = Router();

orderRouter.post(
  ORDER_ROUTES.CREATE_NEW_ORDER,
  (request, response, next) => {
    permissionsMiddleware(request, response, next, [ROLE.SHOP_MANAGER]);
  },
  createOrder,
);

orderRouter.get(ORDER_ROUTES.GET_UNDELIVERED_ORDERS, (request, response) => getOrders(response));

orderRouter.put(ORDER_ROUTES.UPDATE_ORDER_STATUS, updateStatusMiddleware, updateOrderStatus);

export default orderRouter;
