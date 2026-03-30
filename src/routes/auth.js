import express from 'express';
import { signup } from '../controllers/auth.js';
import { validate } from '../middlewares/vallidate.js';
import { signupSchema } from '../validators/validate.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

router.get('/dashboard', protect, restrictTo('admin'), (req, res) => {
    res.json({
        message: "Welcome Admin"
    });
});

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new User
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName: { type: string, example: "saurav"}
 *               lastName: { type: string, example: "ghimire"}
 *               email: { type: string, example: "saurav@gmail.com" }
 *               password: { type: string, example: "password123" }
 *               role: { type: string, example: "customer", enum: ["customer", "seller", "admin"]} 
 *     responses:
 *       201:
 *         description: SingUp successful
 *       401:
 *         description: Validation error 
 */
router.post('/signup', validate(signupSchema), signup);

export default router;