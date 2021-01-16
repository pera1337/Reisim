"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("guides", "guideType", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("guides", "guideTimes", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("guides", "startTime", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("guides", "endTime", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("guides", "organized", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.createTable("goingtos", {
        id: {
          type: Sequelize.INTEGER(11),
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        guideId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Guides",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("guides", "guideType"),
      queryInterface.removeColumn("guides", "guideTimes"),
      queryInterface.removeColumn("guides", "startTime"),
      queryInterface.removeColumn("guides", "endTime"),
      queryInterface.removeColumn("guides", "organized"),
      queryInterface.dropTable("goingtos"),
    ]);
  },
};
