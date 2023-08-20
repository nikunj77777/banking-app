'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('passbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'accounts',
          key: 'id',
        }
      },
      date: {
        type: Sequelize.DATE
      },
      
      status: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('passbooks');
  }
};