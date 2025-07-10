'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Define associations.
     */
    static associate(models) {
      Setting.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Setting.init(
    {
      phoneNo: DataTypes.STRING,
      city: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Setting',
    }
  );

  return Setting;
};
