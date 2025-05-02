'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('intermediate_components', [
            {
                sku: 'MOD-CONTROL',
                nombre: 'Módulo de control electrónico',
                tiempo: 'larga',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'MOD-PWR',
                nombre: 'Módulo de generación de energía solar',
                tiempo: 'media',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'MOD-COMMS',
                nombre: 'Módulo de comunicaciones',
                tiempo: 'larga',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'MOD-PROP',
                nombre: 'Módulo de propulsión interna',
                tiempo: 'larga',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'MOD-SENSOR',
                nombre: 'Módulo de sensores orbitales',
                tiempo: 'larga',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('intermediate_components', null, {});
    }
};
