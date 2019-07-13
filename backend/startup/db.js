const Sequelize = require("sequelize");
module.exports = function() {
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST_NAME,
      port: process.env.DB_PORT,
      dialect: "mysql",
      logging: false
    }
  );
  global.sequelize = sequelize;
  return sequelize;
};
