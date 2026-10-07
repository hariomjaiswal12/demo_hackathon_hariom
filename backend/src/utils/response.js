export const sendSuccess = (res, statusCode = 200, message = 'Operation successful', data = null) => {
  const responsePayload = {
    success: true,
    message,
  };
  if (data !== null) {
    responsePayload.data = data;
  }
  return res.status(statusCode).json(responsePayload);
};

export const sendError = (res, statusCode = 500, message = 'An error occurred', errors = [], extra = {}) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors: Array.isArray(errors) ? errors : [errors],
    ...extra,
  });
};
