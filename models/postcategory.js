module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {}, { timestamps: false });
  
    return PostCategory;
  };
  