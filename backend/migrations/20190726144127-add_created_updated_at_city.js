'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("cities", "createdAt", {
        type: Sequelize.DATE
      }),
      queryInterface.addColumn("cities", "updatedAt", {
        type: Sequelize.DATE
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("cities", "createdAt"),
      queryInterface.removeColumn("cities", "updatedAt")
    ]);
  }
};
