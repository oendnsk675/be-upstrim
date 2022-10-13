'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.Task, {
      //   foreignKey: 'userId'
      // })
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail:true
      },
      unique: {
          args: true,
          msg: 'Email address already in use!'
      }
    },
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.ENUM('user', 'admin'),
    instagram: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twiter: DataTypes.STRING,
    google_id: DataTypes.STRING,
    facebook_id: DataTypes.STRING,
    twiter_id: DataTypes.STRING,
    about: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};