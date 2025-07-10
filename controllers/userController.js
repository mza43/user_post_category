const { User, Setting } = require('../models');

exports.createUser = async (req, res) => {
  try {
    const { name, email, setting } = req.body;

    const user = await User.create({ name, email });

    if (setting) {
      const { phoneNo, city, timezone } = setting;
      await Setting.create({
        phoneNo,
        city,
        timezone,
        userId: user.id
      });
    }

    // Optional: return user with setting
    const fullUser = await User.findByPk(user.id, {
      include: [{ model: Setting, as: 'setting' }]
    });

    res.status(201).json(fullUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Setting, as: 'setting' }]
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Setting, as: 'setting' }]
    });

    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, timezone } = req.body;
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Setting, as: 'setting' }]
    });

    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update({ name, email });

    const setting = await user.getSetting({ as: 'setting' });
    if (setting) {
      await setting.update({ phone, timezone });
    }

    res.json({ user, setting });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.destroy();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};