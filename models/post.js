'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    //many to many relation post and category
    static associate(models) {
      Post.belongsToMany(models.Category, {
        through: 'PostCategories',
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      // relation with user
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }

  Post.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Post',
    }
  );

  return Post;
};
