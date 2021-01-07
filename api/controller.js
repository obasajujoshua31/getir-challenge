const Record = require("../db/models/record");
const appLogger = require("../pkg/logger");
const { INTERNALSERVERERROR, OK } = require("./constants");

const getTask = (req, res) => {
  try {
    return res.sendStatus(OK);
  } catch (error) {
    appLogger.error(`could not get tasks: ${error.message}`);
    return res
      .status(INTERNALSERVERERROR)
      .send("could not get task! Please try again");
  }
};

module.exports = getTask;
