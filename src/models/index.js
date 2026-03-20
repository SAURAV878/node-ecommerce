import User from './user.js';
import Category from './category.js';
import Product from './product.js';
import sequelizeInstance from '../core/database.js';

const models = {User, Category, Product};

Object.keys(models).forEach(modleName => {
    if(models[modleName].associate) {
        models[modleName].associate(models);
    }
});

export { sequelizeInstance, User, Category, Product};