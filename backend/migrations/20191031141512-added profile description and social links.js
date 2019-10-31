"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("users", "profileDescription", {
        type: Sequelize.STRING,
        allowNull: true
      }),
      queryInterface.createTable("socialLinks", {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        title: Sequelize.STRING,
        linkTo: Sequelize.STRING,
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("users", "profileDescription"),
      queryInterface.dropTable("socialLinks")
    ]);
  }
};
