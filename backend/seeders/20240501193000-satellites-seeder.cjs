'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('satellites', [
            {
                sku: 'SAT-STARLINK',
                nombre: 'Satélite Starlink funcional',
                tiempo: 'muy larga',
                precio: 'carísimo',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'SAT-OBSERV',
                nombre: 'Satélite de observación terrestre',
                tiempo: 'muy larga',
                precio: 'carísimo',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'MOD-REENT',
                nombre: 'Módulo de reentrada atmosférica',
                tiempo: 'muy larga',
                precio: 'carísimo',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'NAV-SYSTEM',
                nombre: 'Sistema de navegación autónoma',
                tiempo: 'larga',
                precio: 'muy caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('satellites', null, {});
    }
};
