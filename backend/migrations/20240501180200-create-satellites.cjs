'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('satellites', {
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
                type: Sequelize.ENUM('larga', 'muy larga'),
                allowNull: false,
            },
            precio: {
                type: Sequelize.ENUM('muy caro', 'carísimo'),
                allowNull: false,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('satellites');
    },
};
