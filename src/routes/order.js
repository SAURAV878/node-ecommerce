import express from "express";
import { protect } from "../middlewares/auth.js";
import { createOrder, getMyOrder } from "../controllers/order.js";


const router = express.Router();

router.get('/my-orders', protect, getMyOrder);

router.post('/order', protect, createOrder);



export default router;