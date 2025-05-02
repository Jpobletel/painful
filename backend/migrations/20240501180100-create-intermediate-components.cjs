'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('intermediate_components', {
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
                type: Sequelize.ENUM('media', 'larga'),
                allowNull: false,
            },
            precio: {
                type: Sequelize.ENUM('caro'),
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('intermediate_components');
    },
};
