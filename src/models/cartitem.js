import { DataTypes} from "sequelize";
import sequelizeInstance from "../core/database.js";

const CartItem = sequelizeInstance.sequelize.define('CartItems', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Carts',
            key: 'id'
        }
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Products',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
    });

    CartItem.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
    });
};

export default CartItem;