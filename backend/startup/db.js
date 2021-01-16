const Sequelize = require("sequelize");
module.exports = function () {
  let sequelize;
  if (process.env.DATABASE_URL)
    sequelize = new Sequelize(process.env.DATABASE_URL);
  else {
    sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST_NAME,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: console.log,
      }
    );
  }
  global.sequelize = sequelize;
  return sequelize;
};
