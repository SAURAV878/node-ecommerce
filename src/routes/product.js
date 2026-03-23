import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validate } from '../middlewares/vallidate.js';
import {productSchema} from '../validators/product.js';

const router = express.Router();

router.get('/getproduct', getAllProducts);

router.post('/product', protect,  restrictTo('admin','seller'),validate(productSchema),createProduct);

export default router;