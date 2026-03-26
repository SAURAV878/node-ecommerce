import { Cart, CartItem, Product} from "../models/index.js";
import AppError from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";


export const getCart = catchAsync(async (req , res , next) => {
    let cart = await Cart.findOne ({
        where: { 
            userId: req.user.id
        },
        include:[{
            model: CartItem,
            as: 'items',
            include: ['product']
        }]
    });

    if (!cart) {
        return next(new AppError(`Cart not found`, 404 ));
    }

    res.status(200).json({
        status: 'success',
        data : { cart }
    });
});

export const addItem = catchAsync(async (req , res , next) => {
    const {productId, quantity} = req.body;

    const product = await Product.findByPk(productId);
    if(!product) {
        return next(new AppError('Product not found', 400));
    }

    if(product.stock < quantity) {
        return next(new AppError(`Only ${product.stock} items left in stock`, 400))
    }

    let cart = await Cart.findOrCreate({
        where : {
            userId: req.user.id
        }
    });

    let cartItem = await CartItem.findOne({
        where: {
            cartId: cart.id,
            productId
        }
    });

    if(cartItem) {
        if (product.stock < (cartItem.quantity + quantity)) {
            return next (new AppError('Not enough stock to add this in quantity', 404))
        }
        await cartItem.increment('quantity', {
            by: quantity
        });
    } else {
        await CartItem.create({
        cartId: cart.id,
        productId,
        quantity
    });
    }
    

    res.status(200).json ({
        status: 'success',
        message: 'Item is added to cart'
    });
});

export const updateItem = catchAsync(async (req, res, next) => {
    const item = await CartItem.findByPk(req.params.id, {
        include: 'product'
    });

    if(!item) {
        return next(new AppError(`Item not found`,404));
    }

    const { quantity } = req.body;

    if (item.product.stock < quantity) {
        return next(new AppError(`Only ${item.product.stock} items left in stock`, 400));
    }

    await item.update({
        quantity
    });

    res.status(200).json({
        status: 'success',
        data :{
            item
        }
    });
});

export const removeItem = catchAsync (async (req, res, next) => {
    const item = await CartItem.findByPk(req.params.id);

    if(!item) {
        return next(new AppError(`Item not found`, 404));
    }

    await item.destroy();

    res.status(200).json({
        status: 'success',
        message: `${req.params.id} deleted Sucessfully`
    });
});