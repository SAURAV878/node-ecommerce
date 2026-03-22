import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.js';
import { protect, restrictTo } from '../middlewares/auth.js';


const router = express.Router();

router.get('/getproduct', getAllProducts);

router.post('/product', protect,  restrictTo('admin','seller'), createProduct);

export default router;