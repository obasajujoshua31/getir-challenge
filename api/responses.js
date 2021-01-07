/**
 * @description This is responsible for sending http responses to the client.
 * @param  {Response} res Response object
 * @param  {Number} statusCode http StatusCode
 * @param  {Number} code either success or failure
 * @param {String} message
 * @param {Array<object>} records - data records to be returned
 */
const sendResponse = (res, statusCode, code, message, records) => {
  return res.status(statusCode).json({
    code,
    message,
    records,
  });
};

module.exports = sendResponse;
