'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    type: DataTypes.ENUM('T', 'W'),
    status: DataTypes.STRING,
    payment: DataTypes.STRING,
    payment_channel: DataTypes.STRING,
    failure_code: DataTypes.STRING,
    code: DataTypes.STRING,
    to_user: DataTypes.STRING,
    account_holder_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};