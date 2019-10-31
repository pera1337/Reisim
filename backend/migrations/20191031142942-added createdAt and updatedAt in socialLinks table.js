"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("socialLinks", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("socialLinks", "updatedAt", {
        type: Sequelize.DATE
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("socialLinks", "createdAt"),
      queryInterface.removeColumn("socialLinks", "updatedAt")
    ]);
  }
};
