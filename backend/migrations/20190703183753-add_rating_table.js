'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Rating", {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      guideId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Guides",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
	  rating:{
		  type:Sequelize.DECIMAL,
		  allowNull: false
	  },
	  createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Rating");
  }
};
