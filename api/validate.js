const appLogger = require("../pkg/logger");
const { CODE, BADREQUEST } = require("./constants");
const sendResponse = require("./responses");

/**
 * @description This is responsible for validating the request from the client.
 * @param  {Express.Request} req
 * @param  {Express.Response} res
 * @param  {Express.NextFunction} next
 */
const validateGetTask = (req, res, next) => {
  const { startDate, endDate, minCount, maxCount } = req.body;

  const errors = [];
  const endDateTime = new Date(endDate);
  const startDateTime = new Date(startDate);

  if (typeof startDate === "undefined" || isNaN(startDateTime.getTime())) {
    errors.push("start date is invalid or empty");
  }

  if (typeof endDate === "undefined" || isNaN(endDateTime.getTime())) {
    errors.push("end date is invalid or empty");
  }

  if (typeof minCount === "undefined" || isNaN(minCount) || minCount < 0) {
    errors.push("min count is not valid");
  }

  if (typeof maxCount === "undefined" || isNaN(maxCount) || maxCount < 0) {
    errors.push("max count is not valid");
  }

  if (minCount > maxCount) {
    errors.push("min count should not be greater than max count");
  }

  if (errors.length > 0) {
    appLogger.warn(errors.join(" "));
    return sendResponse(res, BADREQUEST, CODE.FAILURE, errors.join(", "), []);
  }

  if (startDateTime.getTime() > endDateTime.getTime()) {
    appLogger.warn("start date is after end date");
    return sendResponse(
      res,
      BADREQUEST,
      CODE.FAILURE,
      "start date is after end date",
      []
    );
  }

  return next();
};

module.exports = validateGetTask;
