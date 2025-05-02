'use strict';

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('base_components', [
            {
                sku: 'ALU-PURO',
                nombre: 'Aluminio puro refinado',
                tiempo: 'media',
                precio: 'barato',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'PCB-BAS',
                nombre: 'Placa de circuito base',
                tiempo: 'corta',
                precio: 'barato',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'MICRO-BAS',
                nombre: 'Microprocesador básico',
                tiempo: 'media',
                precio: 'medio',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'FUEL-LOX',
                nombre: 'Combustible LOX',
                tiempo: 'corta',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'PANEL-SOL',
                nombre: 'Panel solar simple',
                tiempo: 'larga',
                precio: 'medio',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'ANTCOM-BAS',
                nombre: 'Antena de comunicaciones básica',
                tiempo: 'media',
                precio: 'medio',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'VIDRIO-AER',
                nombre: 'Vidrio aeronáutico',
                tiempo: 'corta',
                precio: 'medio',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                sku: 'PROP-MEC',
                nombre: 'Mecanismo de propulsión simple',
                tiempo: 'larga',
                precio: 'caro',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ]);
    },

    down: async (queryInterface) => {
        await queryInterface.bulkDelete('base_components', null, {});
    }
};
