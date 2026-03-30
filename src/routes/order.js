import express from "express";
import { protect } from "../middlewares/auth.js";
import { createOrder, getMyOrder } from "../controllers/order.js";


const router = express.Router();

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Retrieve your order history
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/my-orders', protect, getMyOrder);

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId: { type: integer }
 *                     quantity: { type: integer }
 *     responses:
 *       201:
 *         description: Order created successfully
 */
router.post('/order', protect, createOrder);

export default router;