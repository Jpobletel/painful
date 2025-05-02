import { DataTypes } from 'sequelize';
import { sequelize } from '../database/index.js';

export const Order = sequelize.define('Order', {
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  sku: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  channel: {
    type: DataTypes.STRING
  },
  receivedAt: {
    type: DataTypes.DATE
  },
  deadline: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendiente' // o 'cumplido'
  }
});