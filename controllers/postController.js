const postService = require('../services/postService');
const { successResponse, errorResponse } = require('../utils/response');

exports.createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    successResponse(res, 'Post created successfully', post);
  } catch (err) {
    errorResponse(res, 'Post not created successfully', err);
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    successResponse(res, 'Posts fetched successfully', posts);
  } catch (err) {
    errorResponse(res, 'Failed to fetch posts', err);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) return errorResponse(res, 'Post not found', {}, 404);

    successResponse(res, 'Post fetched successfully', post);
  } catch (err) {
    errorResponse(res, 'Failed to fetch post', err);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) return errorResponse(res, 'Post not found', {}, 404);

    successResponse(res, 'Post updated successfully', post);
  } catch (err) {
    errorResponse(res, 'Failed to update post', err);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (!deleted) return errorResponse(res, 'Post not found', {}, 404);

    successResponse(res, 'Post deleted successfully', {});
  } catch (err) {
    errorResponse(res, 'Failed to delete post', err);
  }
};
