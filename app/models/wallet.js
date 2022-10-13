'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.Payment, {
        foreignKey: 'bank_id'
      })
    }
  }
  Wallet.init({
    is_active: DataTypes.BOOLEAN,
    account_holder_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    bank_id: DataTypes.INTEGER,
    account_number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wallet',
  });
  return Wallet;
};