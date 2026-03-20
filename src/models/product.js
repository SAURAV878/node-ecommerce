import {  DataTypes } from "sequelize";
import sequelizeInstance from '../core/database.js';

const Product = sequelizeInstance.sequelize.define('Product', {
    name: {
        type: DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DECIMAL(10, 2), 
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

Product.associate = (models) => {
    Product.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'owner'
    });
    Product.belongsTo(models.Category, {
        foreignKey: 'categotyId',
        as: 'category'

    });
}

export default Product;