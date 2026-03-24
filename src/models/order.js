import { DataTypes } from "sequelize";
import  sequelizeInstance  from "../core/database.js";

const Order = sequelizeInstance.sequelize.define('Order', {
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
});

Order.associate = (models) => {
    Order.belongsTo(models.User, {
        foreginKey: 'userId',
        as: 'user'
    });
    Order.hasMany(models.OrderItem, {
        foreginKey: 'orderId',
        as: 'items'
    });

};

export default Order;