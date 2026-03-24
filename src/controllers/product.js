
import {Product} from '../models/index.js';
import AppError from '../utils/appError.js';
import {catchAsync} from '../utils/catchAsync.js';
import redisClient from '../core/redis.js';
import { clearCache } from '../utils/cacheHelper.js';


export const getProdcut =catchAsync(async (req, res,next) => {
    const product = await Product.findByPk(req.params.id, {
        include: ['owner', 'category']
    })

    if(!product) {
        return next(new AppError(`No product found with id ${req.params.id}`, 404));
    }
    res.status(200).json ({
        staus: 'sucess',
        data : {
            product
        }
    });
});

export const createProduct = catchAsync(async (req, res, next) => {
    const productData = {
        ...req.body,
        userId: req.user.id //means link th loginuser autoamatically.
    };

    const newProduct = await Product.create(productData);

    await clearCache('products_page');

    res.status(201).json({
        status: 'sucess',
        data : {
            product: newProduct
        }
    });
});

export const getAllProducts = catchAsync(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const cacheKey = `products_page_${page}_limit_${limit}`;

    const cachedData = await redisClient.get(cacheKey);

    if( cachedData ) {
        return res.status(200).json ({
            status: 'sucess',
            source: 'cache',
            data: JSON.parse(cachedData)
        });
    }

    const {count, rows } = await Product.findAndCountAll({
        limit: limit,
        offset: (page - 1) * limit,
        include: ['owner', 'category']
    });

    await redisClient.setEx(cacheKey, 60, JSON.stringify({count, rows}));

    res.status(200).json({
        status: 'sucess',
        source: 'database',
        data: {count, rows}
    });
});

export const upadateProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if(!product) {
        return next(new AppError('No product found', 404));
    }

    if(product.userId !== req.user.id) {
        return next(new AppError('You dont haev a permission to update this product', 403));
    }

    await product.update(req.body);

    await clearCache('products_page');

    res.status(200).json({
        status: 'sucess',
        data : {
            product
        }
    });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByPk(req.params.id);

    if(!product) {
        return next(new AppError(`No product found with that id ${req.params.id}`, 404));
    }

    if(product.userId !== req.user.id ) {
        return next(new AppError('You dont have permission to delete this product', 403));
    }

    await product.destroy();

    await clearCache('products_page');

    res.status(200).json({
        staus: 'sucess',
        message: `Id ${req.params.id} is sucessfully deleted`
    });
});
