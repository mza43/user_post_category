const { Post, User, Category } = require('../models')

exports.createPost = async ({ title, description, userId, categoryIds }) => {
  const post = await Post.create({
    title,
    description,
    userId,
  })

  console.log()

  if (categoryIds && categoryIds.length > 0) {
    await post.setCategories(categoryIds)
  }

  return post
}

exports.getAllPosts = async () => {
  return await Post.findAll({
    include: [{ model: User, as: 'user' }, { model: Category }],
  })
}

exports.getPostById = async (id) => {
  return await Post.findByPk(id, {
    include: [{ model: User, as: 'user' }, { model: Category }],
  })
}

exports.updatePost = async (id, { title, description, categoryIds }) => {
  const post = await Post.findByPk(id)
  if (!post) return null

  await post.update({ title, description })

  if (categoryIds) {
    await post.setCategories(categoryIds)
  }

  return post
}

exports.deletePost = async (id) => {
  const post = await Post.findByPk(id)
  if (!post) return null

  await post.destroy()
  return true
}
