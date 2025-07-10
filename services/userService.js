const { User, Setting } = require('../models');

exports.createUser = async ({ name, email, setting }) => {
  try {
    const user = await User.create({ name, email });

    if (setting) {
      const { phoneNo, city, timezone } = setting;
      await Setting.create({ phoneNo, city, timezone, userId: user.id });
    }

    const fullUser = await User.findByPk(user.id, {
      include: [{ model: Setting, as: 'setting' }],
    });

    return {
      status: true,
      message: 'User created successfully',
      data: fullUser,
    };
  } catch (err) {
    return {
      status: false,
      message: 'User not created successfully',
      error: err,
    };
  }
};

exports.getAllUsers = async () => {
  try {
    const users = await User.findAll({
      include: [{ model: Setting, as: 'setting' }],
    });
    return {
      status: true,
      message: 'Users fetched successfully',
      data: users,
    };
  } catch (err) {
    return {
      status: false,
      message: 'Failed to fetch users',
      error: err,
    };
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: Setting, as: 'setting' }],
    });

    if (!user) {
      return {
        status: false,
        message: 'User not found',
        error: {},
        code: 404,
      };
    }

    return {
      status: true,
      message: 'User fetched successfully',
      data: user,
    };
  } catch (err) {
    return {
      status: false,
      message: 'Failed to fetch user',
      error: err,
    };
  }
};

exports.updateUser = async (id, { name, email, phone, timezone }) => {
  try {
    const user = await User.findByPk(id, {
      include: [{ model: Setting, as: 'setting' }],
    });

    if (!user) {
      return {
        status: false,
        message: 'User not found',
        error: {},
        code: 404,
      };
    }

    await user.update({ name, email });

    const setting = await user.getSetting({ as: 'setting' });
    if (setting) {
      await setting.update({ phone, timezone });
    }

    return {
      status: true,
      message: 'User updated successfully',
      data: { user, setting },
    };
  } catch (err) {
    return {
      status: false,
      message: 'Failed to update user',
      error: err,
    };
  }
};

exports.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      return {
        status: false,
        message: 'User not found',
        error: {},
        code: 404,
      };
    }

    await user.destroy();

    return {
      status: true,
      message: 'User deleted successfully',
      data: {},
    };
  } catch (err) {
    return {
      status: false,
      message: 'Failed to delete user',
      error: err,
    };
  }
};
