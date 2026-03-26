import express from "express";
import { addItem, getCart, removeItem, updateItem } from "../controllers/cart.js";
import {protect} from '../middlewares/auth.js'

const router = express.Router();

router.use(protect)

router.get('/getcart', getCart);

router.post('/addcart', addItem);

router.patch('/update/:id', updateItem);

router.delete('/delete/:id', removeItem);

export default router;

