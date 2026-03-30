import express from "express";
import { addItem, getCart, removeItem, updateItem } from "../controllers/cart.js";
import {protect} from '../middlewares/auth.js'

const router = express.Router();

router.use(protect)

/**
 * @swagger
 * /getcart:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart details retrieved successfully
 */
router.get('/getcart', getCart);


/**
 * @swagger
 * /addcart:
 *   post:
 *     summary: Add an item to the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId: { type: integer, example: 1 }
 *               quantity: { type: integer, example: 1 }
 *     responses:
 *       200:
 *         description: Item added successfully
 */
router.post('/addcart', addItem);

/**
 * @swagger
 * /update/{id}:
 *   patch:
 *     summary: Update item quantity in cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity: { type: integer, example: 2 }
 *     responses:
 *       200:
 *         description: Quantity updated
 */
router.patch('/update/:id', updateItem);


/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Item deleted
 */
router.delete('/delete/:id', removeItem);

export default router;

