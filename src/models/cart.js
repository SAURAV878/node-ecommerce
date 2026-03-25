import { DataTypes } from "sequelize";
import sequelizeInstance from '../core/database.js';

const Cart = sequelizeInstance.sequelize.define('Carts', {
    id: {
        type:  DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key : 'id'
        }
    }
});

Cart.associate = (models) => {
    Cart.hasone(models.User), {
        foreginKey: 'userId',
        as: 'user'
    }
}

export default Cart;