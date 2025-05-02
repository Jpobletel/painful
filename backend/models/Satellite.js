import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const Satellite = sequelize.define('Satellite', {
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
        type: DataTypes.ENUM('larga', 'muy larga'),
        allowNull: false,
    },
    precio: {
        type: DataTypes.ENUM('muy caro', 'carísimo'),
        allowNull: false,
    },
}, {
    tableName: 'satellites',
    timestamps: true,
});
