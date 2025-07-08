'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Define associations.
     */
    static associate(models) {
      // One-to-One: Setting --> User
      Setting.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Setting.init({
    phoneNo: DataTypes.STRING,
    city: DataTypes.STRING,
    userId: DataTypes.INTEGER // Add the foreign key to the model
  }, {
    sequelize,
    modelName: 'Setting',
  });

  return Setting;
};
