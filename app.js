const express = require("express");
const { handleNotFound, initAppMiddlewares } = require("./app.middleware");
const config = require("./config/config");
const connectToDb = require("./db/connect");
const app = express();
const mongoose = require("mongoose");
const port = config.appPort || 5500;
const routes = require("./api/routes");
//Initialize app middlewares
initAppMiddlewares(app);

// initialize app routes
app.use("/", routes);

// Application to handle other requests that handler cannot be found
app.all("*", handleNotFound);

const connection = connectToDb(config.dbUrl);

// Close all existing connection before exit
process.on("exit", () => {
  mongoose.connection.close();
});

connection
  .then(async () => {
    console.log("MongoDB Connected!");
    app.listen(port, console.log(`<== SERVER started at ${port} ==>`));
  })
  .catch((error) => {
    console.error("Unable to connect to MongoDB Database", error);
    process.exit(1);
  });

module.exports = app;
