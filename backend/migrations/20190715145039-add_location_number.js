'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.addColumn("locations", "locationNumber", {
        type: Sequelize.INTEGER
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("locations", "locationNumber");
  }
};
