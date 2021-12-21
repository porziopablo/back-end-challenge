// vendors
import { Router } from 'express';

// controllers
import createOrder from '../controllers/orderController.js';

// routes
import { ORDER_ROUTES } from './constants/routes.js';

const orderRouter = Router();

orderRouter.post(ORDER_ROUTES.CREATE_NEW_ORDER, createOrder);

export default orderRouter;
