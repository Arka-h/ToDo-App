require("dotenv").config();
module.exports = {
  dbName: process.env.DB_NAME,
  dbPassword: process.env.DB_PASSWD,
  gclient: process.env.G_CLIENT,
  gpass: process.env.G_PASSWD,
};
