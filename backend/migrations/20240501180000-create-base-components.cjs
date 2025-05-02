'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('base_components', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            sku: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            tiempo: {
                type: Sequelize.ENUM('corta', 'media', 'larga'),
                allowNull: false,
            },
            precio: {
                type: Sequelize.ENUM('barato', 'medio', 'caro'),
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('base_components');
    },
};
