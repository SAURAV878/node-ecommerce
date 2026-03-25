import { catchAsync } from '../utils/catchAsync.js';
import {Order, OrderItem, Product, sequelizeInstance} from '../models/index.js';
import AppError from '../utils/appError.js';
import { clearCache } from '../utils/cacheHelper.js';



export const createOrder = catchAsync(async (req , res , next) => {
    const result = await sequelizeInstance.sequelize.transaction(async (t) => {
        const { items } = req.body;
        let totalPrice = 0;
        const orderItemsData = [];

        for (const item of items) {
            const product = await Product.findByPk(item.productId, {transaction: t});

            if(!product) {
                return next(new AppError(`Product ${item.productId} not found`, 404));
            }

            if(product.stock < item.quantity) {
                return next(new AppError(`Not enough stock for ${product.name}`, 400))
            }

            await product.decrement('stock', {
                by:item.quantity,
                transaction: t
            });

            const price = product.price * item.quantity;
            totalPrice += price;

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: product.price
            });
        }

        const order = await Order.create({
            userId: req.user.id,
            totalPrice
        }, {transaction: t});

        for (const item of orderItemsData) {
            await OrderItem.create({
                ...item,
                orderId: order.id,
            }, { transaction: t});
        }

        return order;
    });

    await clearCache('products_page');

    res.status(201).json({
        status: 'sucess',
        data: {
            order: result
        }
    });
});
