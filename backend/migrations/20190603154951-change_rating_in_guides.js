"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("guides", "avgRating", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("guides", "avgRating", {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0.0
    });
  }
};
