import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const BaseComponent = sequelize.define('BaseComponent', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tiempo: {
        type: DataTypes.ENUM('corta', 'media', 'larga'),
        allowNull: false,
    },
    precio: {
        type: DataTypes.ENUM('barato', 'medio', 'caro'),
        allowNull: false,
    },
}, {
    tableName: 'base_components',
    timestamps: true,
});
