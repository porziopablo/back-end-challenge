// vendors
import { Router } from 'express';

// controllers
import { createOrder, getOrders, updateOrderStatus } from '../controllers/orderController.js';

// routes
import { ORDER_ROUTES } from './constants/routes.js';

const orderRouter = Router();

orderRouter.post(ORDER_ROUTES.CREATE_NEW_ORDER, createOrder);

orderRouter.get(ORDER_ROUTES.GET_UNDELIVERED_ORDERS, (request, response) => getOrders(response));

orderRouter.put(ORDER_ROUTES.UPDATE_ORDER_STATUS, updateOrderStatus);

export default orderRouter;
