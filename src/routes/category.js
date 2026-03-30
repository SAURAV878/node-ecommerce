import express from 'express';
import { protect, restrictTo } from '../middlewares/auth.js';
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/category.js';
import { validate } from '../middlewares/vallidate.js';
import { categorySchema } from '../validators/category.js';

const router = express.Router();
/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Retrieve a paginated list of category
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/category/:id', getCategory);

/**
 * @swagger
 * /get-category:
 *   get:
 *     summary: Retrieve a paginated list of products
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/get-category', getAllCategories);


/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "Electronics" }
 *               description: { type: string, example: "Gadgets and devices" }
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/category', protect, restrictTo('admin'), validate(categorySchema), createCategory);

/**
 * @swagger
 * /category/{id}:
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: "New Category Name" }
 *               description: { type: string, example: "Updated description" }
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
router.patch('/category/:id', protect, restrictTo('admin', 'seller'), updateCategory);



/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete a product (Admin/Seller only)
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Category deleted successfully
 */
router.delete('/category/:id', protect, restrictTo('admin'), deleteCategory);

export default router;