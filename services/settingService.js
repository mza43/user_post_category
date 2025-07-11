const { Setting, User } = require('../models')

exports.createSetting = async ({ phoneNo, city, userId }) => {
  const exists = await Setting.findOne({ where: { userId } })
  if (exists) {
    throw new Error('Setting already exists for this user.')
  }

  return await Setting.create({ phoneNo, city, userId })
}

exports.getAllSettings = async () => {
  return await Setting.findAll({
    include: [{ model: User, as: 'user' }],
  })
}

exports.getSettingById = async (id) => {
  return await Setting.findByPk(id, {
    include: [{ model: User, as: 'user' }],
  })
}

exports.updateSetting = async (id, { phoneNo, city }) => {
  const setting = await Setting.findByPk(id)
  if (!setting) return null

  await setting.update({ phoneNo, city })
  return setting
}

exports.deleteSetting = async (id) => {
  const setting = await Setting.findByPk(id)
  if (!setting) return null

  await setting.destroy()
  return true
}
