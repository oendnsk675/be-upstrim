'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Balance.init({
    code: DataTypes.STRING,
    user_id: DataTypes.STRING,
    amount: DataTypes.STRING,
    type: DataTypes.ENUM('T', 'W'),
    status: DataTypes.STRING,
    failure_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Balance',
  });
  return Balance;
};