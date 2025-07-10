const { Setting, User } = require('../models');

// Create setting
exports.createSetting = async (req, res) => {
  try {
    const { phoneNo, city, userId } = req.body;

    //  Check if setting already exists 
    const exists = await Setting.findOne({ where: { userId } });
    if (exists) return res.status(400).json({ error: 'Setting already exists for this user.' });

    const setting = await Setting.create({ phoneNo, city, userId });
    res.status(201).json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all settings
exports.getAllSettings = async (req, res) => {
  try {
    const settings = await Setting.findAll({
      include: [{ model: User, as: 'user' }]
    });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single setting by ID
exports.getSettingById = async (req, res) => {
  try {
    const setting = await Setting.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }]
    });

    if (!setting) return res.status(404).json({ error: 'Setting not found' });

    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update setting
exports.updateSetting = async (req, res) => {
  try {
    const { phoneNo, city } = req.body;

    const setting = await Setting.findByPk(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });

    await setting.update({ phoneNo, city });
    res.json(setting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete setting
exports.deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findByPk(req.params.id);
    if (!setting) return res.status(404).json({ error: 'Setting not found' });

    await setting.destroy();
    res.json({ message: 'Setting deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};