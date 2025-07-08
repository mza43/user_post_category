'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Many-to-Many: Post <--> Category
      Post.belongsToMany(models.Category, {
        through: 'PostCategories',
        foreignKey: 'postId',
        otherKey: 'categoryId'
      });

      // Many-to-One: Post --> User
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
  }

  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER // include foreign key for User
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};
