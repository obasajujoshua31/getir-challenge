require("dotenv").config();

const { APP_PORT, DATABASE_URL, NODE_ENV } = process.env;

// Application configuration
module.exports = {
  appPort: APP_PORT,
  dbUrl: DATABASE_URL,
  env: NODE_ENV,
};
