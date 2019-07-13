"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("guides", "avgRating", {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.0
      }),
      queryInterface.addColumn("guides", "numOfRatings", {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("guides", "avgRating"),
      queryInterface.removeColumn("guides", "numOfRatings")
    ]);
  }
};
