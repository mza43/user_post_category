'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many-to-Many: Category <--> Post
      Category.belongsToMany(models.Post, {
        through: 'PostCategories',
        foreignKey: 'categoryId',
        otherKey: 'postId',
      })
    }
  }

  Category.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  )

  return Category
}
