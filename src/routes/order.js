// vendors
import { Router } from 'express';

// controllers
import { createOrder, getOrders } from '../controllers/orderController.js';

// routes
import { ORDER_ROUTES } from './constants/routes.js';

const orderRouter = Router();

orderRouter.post(ORDER_ROUTES.CREATE_NEW_ORDER, createOrder);

orderRouter.get(ORDER_ROUTES.GET_UNDELIVERED_ORDERS, (request, response) => getOrders(response));

export default orderRouter;
