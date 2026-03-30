import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProdcut, upadateProduct } from '../controllers/product.js';
import { protect, restrictTo } from '../middlewares/auth.js';
import { validate } from '../middlewares/vallidate.js';
import {productSchema} from '../validators/product.js';

const router = express.Router();

/**
 * @swagger
 * /getproduct:
 *   get:
 *     summary: Retrieve a paginated list of products
 *     tags: [Products]
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
router.get('/getproduct', getAllProducts);

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Product details
 */
router.get('/product/:id', getProdcut);

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product (Admin/Seller only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               price: { type: number }
 *               description: { type: string }
 *               stock: { type: integer }
 *               categoryId: { type: integer }
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/product', protect,  restrictTo('admin','seller'),validate(productSchema),createProduct);


/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product (Admin/Seller only)
 *     tags: [Products]
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
 *               name: { type: string }
 *               price: { type: number }
 *     responses:
 *       200:
 *         description: Product updated successfully
 */
router.patch('/product/:id', protect, restrictTo('admin', 'seller'), upadateProduct);


/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (Admin/Seller only)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       204:
 *         description: Product deleted successfully
 */
router.delete('/product/:id', protect, restrictTo('admin' ,'seller'), deleteProduct);

export default router;
