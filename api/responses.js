const sendResponse = (res, statusCode, code, message, records) => {
  return res.status(statusCode).json({
    code,
    message,
    records,
  });
};

module.exports = sendResponse;
