const Sequelize = require("sequelize");

let User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING(24),
    allowNull: false,
    defaultValue: "user123"
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true
  },
  profileDescription: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profileImage: Sequelize.STRING
});

let ProfileSocialLinks = sequelize.define("socialLink", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: Sequelize.STRING,
  linkTo: Sequelize.STRING,
  userId: Sequelize.INTEGER(11)
});

let Location = sequelize.define("location", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  lat: Sequelize.DECIMAL(10, 8),
  lng: Sequelize.DECIMAL(11, 8),
  locationNumber: Sequelize.INTEGER,
  guideId: Sequelize.INTEGER(11),
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

let Guide = sequelize.define("guide", {
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

let Rating = sequelize.define("rating", {
  rating: Sequelize.DECIMAL
});

let City = sequelize.define("city", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: Sequelize.STRING,
  full_name: Sequelize.STRING,
  guideId: Sequelize.INTEGER(11)
});

Guide.hasMany(Location, { foreignKey: "guideId" });
Location.belongsTo(Guide, { as: "Guide", foreignKey: "guideId" });
User.hasMany(Guide, { as: "Guides", foreignKey: "userId" });
User.belongsToMany(User, {
  through: "follow",
  as: "Follower",
  foreignKey: "followingId"
});
User.belongsToMany(User, {
  through: "follow",
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
User.hasMany(ProfileSocialLinks, { foreignKey: "userId" });
ProfileSocialLinks.belongsTo(User, { foreignKey: "userId" });

Guide.belongsTo(User, { as: "User", foreignKey: "userId" });

Guide.hasMany(City, { as: "Cities", foreignKey: "guideId" });
City.belongsTo(Guide, { foreignKey: "guideId" });

module.exports.User = User;
module.exports.Location = Location;
module.exports.Guide = Guide;
module.exports.Rating = Rating;
module.exports.City = City;
module.exports.SocialLinks = ProfileSocialLinks;
