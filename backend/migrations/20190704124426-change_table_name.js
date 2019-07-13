'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.renameTable("Rating","Ratings");
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable("Ratings","Rating");
  }
};
