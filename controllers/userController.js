const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  const result = await userService.createUser(req.body);
  res.status(result.status ? 201 : 500).json(result);
};

exports.getAllUsers = async (req, res) => {
  const result = await userService.getAllUsers();
  res.status(result.status ? 200 : 500).json(result);
};

exports.getUserById = async (req, res) => {
  const result = await userService.getUserById(req.params.id);
  res.status(result.status ? 200 : result.code || 500).json(result);
};

exports.updateUser = async (req, res) => {
  const result = await userService.updateUser(req.params.id, req.body);
  res.status(result.status ? 200 : result.code || 500).json(result);
};

exports.deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.id);
  res.status(result.status ? 200 : result.code || 500).json(result);
};
