import express from 'express';
import { signup } from '../controllers/auth.js';
import { validate } from '../middlewares/vallidate.js';
import { signupSchema } from '../validators/validate.js';
import { protect, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

router.get('/dashboard', protect, restrictTo('admin'), (req, res) => {
    res.json({
        message: "Welcomr Admin"
    });
});

router.post('/signup', validate(signupSchema), signup);

export default router;