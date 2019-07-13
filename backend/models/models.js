const Sequelize = require("sequelize");

let User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  }
});

let Location = sequelize.define("Location", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  lat: Sequelize.DECIMAL(10, 8),
  lng: Sequelize.DECIMAL(11, 8),
  guideId: Sequelize.INTEGER(11)
});

let Guide = sequelize.define("Guide", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  avgRating: { type: Sequelize.DECIMAL, allowNull: false, defaultValue: 0.0 },
  numOfRatings: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  userId: Sequelize.INTEGER(11)
});

let Rating = sequelize.define("Rating", {
    rating: Sequelize.DECIMAL
});

Guide.hasMany(Location, { foreignKey: "guideId" });
Location.belongsTo(Guide, { foreignKey: "guideId" });
User.hasMany(Guide, { foreignKey: "userId" });
User.belongsToMany(User, {
  through: "Follow",
  as: "Follower",
  foreignKey: "followingId"
});
User.belongsToMany(User, {
  through: "Follow",
  as: "Following",
  foreignKey: "followerId"
});

User.belongsToMany(Guide, {
  through: Rating,
  as: "RatingUser",
  foreignKey: "userId"
});
Guide.belongsToMany(User, {
  through: Rating,
  as: "RatingGuide",
  foreignKey: "guideId"
});

Guide.belongsTo(User, { foreignKey: "userId" });

module.exports.User = User;
module.exports.Location = Location;
module.exports.Guide = Guide;
module.exports.Rating = Rating;