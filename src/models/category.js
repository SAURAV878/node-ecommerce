import { DataTypes } from "sequelize";
import sequelizeInstance from '../core/database.js'

const Category = sequelizeInstance.sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull:false
    },
    description: {
        type: DataTypes.STRING,
    }

});

Category.associate = (models) => {
    Category.hasMany(models.Product, {
        foreignKey: 'categoryId',
        as: 'products'
    });
}

export default Category;