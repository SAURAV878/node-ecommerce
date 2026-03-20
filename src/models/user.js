import { DataTypes } from "sequelize";
import sequelizeInstance from "../core/database.js"

const User = sequelizeInstance.sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type:DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true}
    },
    password: {
        type:DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('customer', 'seller', 'admin'),
        defaultValue: 'customer',
        allowNull: false
    }

});

User.associate = (models) => {
    User.hasMany(models.Product, {
        foreignKey: 'userId',
        as: 'products'
      });
};

export default User;