const settingService = require('../services/settingService')
const { successResponse, errorResponse } = require('../utils/response')

exports.createSetting = async (req, res) => {
  try {
    const setting = await settingService.createSetting(req.body)
    successResponse(res, 'Setting created successfully', setting)
  } catch (err) {
    errorResponse(res, 'Setting not created successfully', err.message)
  }
}

exports.getAllSettings = async (req, res) => {
  try {
    const settings = await settingService.getAllSettings()
    successResponse(res, 'Settings fetched successfully', settings)
  } catch (err) {
    errorResponse(res, 'Failed to fetch settings', err.message)
  }
}

exports.getSettingById = async (req, res) => {
  try {
    const setting = await settingService.getSettingById(req.params.id)
    if (!setting) return errorResponse(res, 'Setting not found', {}, 404)

    successResponse(res, 'Setting fetched successfully', setting)
  } catch (err) {
    errorResponse(res, 'Failed to fetch setting', err.message)
  }
}

exports.updateSetting = async (req, res) => {
  try {
    const setting = await settingService.updateSetting(req.params.id, req.body)
    if (!setting) return errorResponse(res, 'Setting not found', {}, 404)

    successResponse(res, 'Setting updated successfully', setting)
  } catch (err) {
    errorResponse(res, 'Failed to update setting', err.message)
  }
}

exports.deleteSetting = async (req, res) => {
  try {
    const deleted = await settingService.deleteSetting(req.params.id)
    if (!deleted) return errorResponse(res, 'Setting not found', {}, 404)

    successResponse(res, 'Setting deleted successfully', {})
  } catch (err) {
    errorResponse(res, 'Failed to delete setting', err.message)
  }
}
