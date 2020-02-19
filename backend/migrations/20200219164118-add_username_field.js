"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "username", {
      type: Sequelize.STRING(24),
      allowNull: false,
      defaultValue: "user123"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "username");
  }
};
