import User from './user.js';
import Category from './category.js';
import Product from './product.js';
import Order from './order.js';
import OrderItem from './orderItem.js';
import sequelizeInstance from '../core/database.js';
import Cart from './cart.js';
import CartItem from './cartitem.js';

const models = {User, Category, Product, Order, OrderItem, Cart, CartItem};

Object.keys(models).forEach(modleName => {
    if(models[modleName].associate) {
        models[modleName].associate(models);
    }
});

export { sequelizeInstance, User, Category, Product, Order, OrderItem, Cart, CartItem};