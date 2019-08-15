"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("locations", "name", {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn("locations", "description", {
        type: Sequelize.STRING
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("locations", "name"),
      queryInterface.removeColumn("locations", "description")
    ]);
  }
};
