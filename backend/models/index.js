import { sequelize } from '../database/index.js';
import { BaseComponent } from './BaseComponent.js';
import { IntermediateComponent } from './IntermediateComponent.js';
import { Satellite } from './Satellite.js';
import { Order } from './Order.js';

// Aquí podrías agregar asociaciones si las defines más adelante
// Satellite.hasMany(IntermediateComponent); por ejemplo

export {
    sequelize,
    BaseComponent,
    IntermediateComponent,
    Satellite,
    Order
};
