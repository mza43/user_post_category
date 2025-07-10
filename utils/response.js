exports.successResponse = (res, message, data = {}) => {
  return res.status(200).json({
    status: true,
    message,
    data,
  });
};

exports.errorResponse = (res, message, error = {}, statusCode = 500) => {
  return res.status(statusCode).json({
    status: false,
    message,
    error,
  });
};
