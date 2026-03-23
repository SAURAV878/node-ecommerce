import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import { createCategory, getAllCategories } from '../controllers/category.js';
import { validate } from '../middlewares/vallidate.js';
import { categorySchema } from '../validators/category.js';

const router = express.Router();

router.get('/get-category', getAllCategories);
router.post('/category', protect, restrictTo('admin'), validate(categorySchema), createCategory);

export default router;