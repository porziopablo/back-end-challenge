// vendors
import { Router } from 'express';

// controllers
import getProducts from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('', getProducts);

export default productRouter;
