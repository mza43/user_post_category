const { Category, Post } = require('../models');

exports.createCategory = async ({ title, description }) => {
  return await Category.create({ title, description });
};

exports.getAllCategories = async () => {
  return await Category.findAll({
    include: [{ model: Post }],
  });
};

exports.getCategoryById = async (id) => {
  return await Category.findByPk(id, {
    include: [{ model: Post }],
  });
};

exports.updateCategory = async (id, { title, description }) => {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.update({ title, description });
  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findByPk(id);
  if (!category) return null;

  await category.destroy();
  return category;
};
