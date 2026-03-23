import express from 'express';
import { protect, restrictTo } from '../middlewares/auth';
import { createCategory } from '../controllers/category';

const router = express.Router();

router.post('/', protect, restrictTo('admin'), createCategory);

export default router;