import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/category.js';
import { validate } from '../middlewares/vallidate.js';
import { categorySchema } from '../validators/category.js';

const router = express.Router();

router.get('/category/:id', getCategory);

router.get('/get-category', getAllCategories);

router.post('/category', protect, restrictTo('admin'), validate(categorySchema), createCategory);

router.patch('/category/:id', protect, restrictTo('admin', 'seller'), updateCategory);

router.delete('/category/:id', protect, restrictTo('admin'), deleteCategory);

export default router;