import { DataTypes } from "sequelize";
import sequelizeInstance from "../core/database.js";


const OrderItem = sequelizeInstance.sequelize.define('OrderItem', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, {
        foreginKey: 'orderId',
        as: 'order'
    });
    OrderItem.belongsTo(models.Product, {
        foreginKey: 'productId',
        as: 'product'
    });
}

export default OrderItem;