import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProdcut, upadateProduct } from '../controllers/product.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validate } from '../middlewares/vallidate.js';
import {productSchema} from '../validators/product.js';

const router = express.Router();

router.get('/getproduct', getAllProducts);

router.get('/product/:id', getProdcut);

router.post('/product', protect,  restrictTo('admin','seller'),validate(productSchema),createProduct);

router.patch('/product/:id', protect, restrictTo('admin', 'seller'), upadateProduct);

router.delete('/product/:id', protect, restrictTo('admin' ,'seller'), deleteProduct);

export default router;
