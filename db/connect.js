const mongoose = require("mongoose");
const { dbUrl } = require("../config/config");

/**
 * @description This will connect to mongo database instance with database url and database name
 * @param  {object} config - destructures database URl and database name to connect to
 * @returns {Promise<mongoose.Mongoose>}
 */
const connectToDB = ( dBUrl ) => {
  return new Promise((resolve, reject) => {
    return mongoose
      .connect(dBUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((connection) => {
        resolve(connection);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = connectToDB;
