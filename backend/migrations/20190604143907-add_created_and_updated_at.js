"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Follow", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("Follow", "updatedAt", {
        type: Sequelize.DATE
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Follow", "createdAt"),
      queryInterface.removeColumn("Follow", "updatedAt")
    ]);
  }
};
