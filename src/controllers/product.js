import {Product} from '../models/index.js';
import {catchAsync} from '../utils/catchAsync.js';

export const createProduct = catchAsync(async (req, res, next) => {
    const productData = {
        ...req.body,
        userId: req.user.id //means link th loginuser autoamatically.
    };

    const newProduct = await Product.create(productData);

    res.status(201).json({
        status: 'sucess',
        data : {
            product: newProduct
        }
    });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
    const products = await Product.findAll({
        include: ['owner', 'category']
    });

    res.status(200).json({
        status: 'sucess',
        results: products.length,
        data: {
            products
        }
    });
});