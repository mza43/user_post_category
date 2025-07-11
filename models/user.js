'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Define associations.
     */
    static associate(models) {
      // One-to-Many: User --> Posts
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
      })

      // One-to-One: User --> Setting
      User.hasOne(models.Setting, {
        foreignKey: 'userId',
        as: 'setting',
      })
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  return User
}
