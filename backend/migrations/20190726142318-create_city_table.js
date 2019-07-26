"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("cities", {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: Sequelize.STRING,
      full_name: Sequelize.STRING,
      guideId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Guides",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("cities");
  }
};
