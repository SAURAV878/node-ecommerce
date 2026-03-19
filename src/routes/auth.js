import express from 'express';
import { signup } from '../controllers/auth.js';
import { validate } from '../middlewares/vallidate.js';
import { signupSchema } from '../validators/validate.js';

const router = express.Router();

router.post('/signup', validate(signupSchema), signup);

export default router;