import express from "express";
import { protect } from "../middlewares/auth.js";
import { createOrder } from "../controllers/order.js";


const router = express.Router();

router.post('/order', protect, createOrder);

export default router;