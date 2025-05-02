import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const IntermediateComponent = sequelize.define('IntermediateComponent', {
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
    type: DataTypes.ENUM('media', 'larga'),
    allowNull: false,
  },
  precio: {
    type: DataTypes.ENUM('caro'),
    allowNull: false,
  },
}, {
  tableName: 'intermediate_components',
  timestamps: true,
});
