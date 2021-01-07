const Record = require("../db/models/record");
const appLogger = require("../pkg/logger");
const { INTERNALSERVERERROR, OK, CODE } = require("./constants");
const sendResponse = require("./responses");


/**
 * @description This is responsible for getting tasks from the db.
 * @param  {Request} req
 * @param  {Response} res
 */
const getTask = async (req, res) => {
  try {
    const { startDate, endDate, minCount, maxCount } = req.body;

    // mongo query pipeline
    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        },
      },
      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: {
            $sum: "$counts",
          },
        },
      },
      {
        $match: {
          totalCount: {
            $gte: minCount,
            $lte: maxCount,
          },
        },
      },
    ];

    const records = await Record.aggregate(pipeline).exec();

    appLogger.info("successfully retrieved records");
    return sendResponse(res, OK, CODE.SUCCESS, "Success", records);
  } catch (error) {
    appLogger.error(`could not get tasks: ${error.message}`);
    return sendResponse(
      res,
      INTERNALSERVERERROR,
      CODE.FAILURE,
      "unable to retrieve records! try again later",
      []
    );
  }
};

module.exports = getTask;
