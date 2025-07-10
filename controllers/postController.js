const { Post, User, Category } = require('../models');

//  Create a new Post
exports.createPost = async (req, res) => {
  try {
    const { title, description, userId, categoryIds } = req.body;

    // Create the post and associate it with the user
    const post = await Post.create({
      title,
      description,
      UserId: userId
    });

    // Associate categories if any
    if (categoryIds && categoryIds.length > 0) {
      await post.setCategories(categoryIds);
    }

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get all posts with user and categories
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, as: 'user' },         
        { model: Category }                    
      ]
    });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: Category }
      ]
    });

    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { title, description, categoryIds } = req.body;

    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.update({ title, description });

    if (categoryIds) {
      await post.setCategories(categoryIds);
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    await post.destroy();

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
