'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('T', 'W'),
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false
      },
      payment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      payment_channel: {
        type: Sequelize.STRING,
        allowNull: true
      },
      failure_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      account_holder_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};