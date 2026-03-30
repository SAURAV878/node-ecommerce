import express from 'express';
import { login } from '../controllers/auth.js';


const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "saurav@gmail.com" }
 *               password: { type: string, example: "password123" }
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login',   login)

export default router;