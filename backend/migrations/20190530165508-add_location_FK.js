"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("locations", "guideId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Guides",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("locations", "guideId", {
      type: Sequelize.INTEGER
    });
  }
};
