const categoryService = require('../services/categoryService');
const { successResponse, errorResponse } = require('../utils/response');

exports.createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    successResponse(res, 'Category created successfully', category);
  } catch (err) {
    errorResponse(res, 'Category creation failed', err);
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    successResponse(res, 'Categories fetched successfully', categories);
  } catch (err) {
    errorResponse(res, 'Failed to fetch categories', err);
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) return errorResponse(res, 'Category not found', {}, 404);

    successResponse(res, 'Category fetched successfully', category);
  } catch (err) {
    errorResponse(res, 'Failed to fetch category', err);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    if (!category) return errorResponse(res, 'Category not found', {}, 404);

    successResponse(res, 'Category updated successfully', category);
  } catch (err) {
    errorResponse(res, 'Failed to update category', err);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    if (!category) return errorResponse(res, 'Category not found', {}, 404);

    successResponse(res, 'Category deleted successfully', {});
  } catch (err) {
    errorResponse(res, 'Failed to delete category', err);
  }
};
