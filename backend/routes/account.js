const express = require("express");
const router = express.Router();
const { User, Guide, SocialLinks } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Sequelize = require("sequelize");

router.post("/register", async (req, res) => {
  let { username, firstName, lastName, email, password } = req.body;
  let user = await User.findOne({ where: { email } });
  if (user)
    return res.status(401).send("A user with that email already exists");

  user = await User.findOne({ where: { username } });
  if (user) return res.status(401).send("Username already taken.");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    firstName,
    lastName,
    email,
    password,
    profileDescription: ""
  });

  const sendUser = {
    id: newUser.id,
    firstName: newUser.firstName,
    email: newUser.email,
    username
  };
  const token = await jwt.sign(
    { email, id: newUser.id, username },
    process.env.JWT_SIGN_SERCRET
  );
  res.send({ user: sendUser, token });
});

router.put("/register", async (req, res) => {
  let { username, firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("User not found");

  const sameUsername = await User.findOne({
    where: {
      [Sequelize.Op.and]: [
        { username },
        { email: { [Sequelize.Op.ne]: email } }
      ]
    }
  });
  if (sameUsername) return res.status(401).send("Username already taken.");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user.firstName = firstName;
  user.username = username;
  user.lastName = lastName;
  user.password = password;

  await user.save();
  const sendUser = {
    id: user.id,
    firstName: user.firstName,
    email: user.email,
    username: user.username
  };

  const token = await jwt.sign(
    { email, id: user.id,username: user.username },
    process.env.JWT_SIGN_SERCRET
  );
  res.send({user:sendUser,token});
});

router.delete("/", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("User not found");

  const returnUser = user;
  await user.destroy();
  res.send(returnUser);
});

router.get("/feed", auth, async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const userId = req.user.id;
  const follower = await User.findOne({
    where: { id: userId }
  });
  const users = await follower.getFollowing({
    attributes: ["id"]
  });
  const userIds = [];
  users.forEach(el => {
    userIds.push(el.id);
  });
  const guides = await Guide.findAll({
    where: { userId: { [Sequelize.Op.in]: userIds } },
    include: {
      model: User,
      as: "User",
      attributes: ["id", "firstName", "lastName", "profileImage", "username"]
    },
    order: [["updatedAt", "DESC"]],
    limit: Number(limit),
    offset: Number(offset)
  });

  res.send(guides);
});

/*router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    include: [
      { model: Guide, as: "Guides" },
      { model: SocialLinks, as: "SocialLinks" }
    ],
    attributes: { exclude: ["password"] },
    order: [[Guide, "updatedAt", "DESC"]]
  });
  if (!user) return res.status(401).send("User not found");

  res.send(user);
});*/

router.get("/:username", async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
    include: [
      { model: Guide, as: "Guides" },
      { model: SocialLinks, as: "SocialLinks" }
    ],
    attributes: { exclude: ["password","email"] },
    order: [[Guide, "updatedAt", "DESC"]]
  });
  if (!user) return res.status(401).send("User not found");
  res.send(user);
});

router.get("/edit/:username",auth, async (req, res) => {
  if(req.user.username!==req.params.username) return res.status(403).send("Cannot edit this users data");
  const user = await User.findOne({
    where: { username: req.params.username },
    include: [
      { model: Guide, as: "Guides" },
      { model: SocialLinks, as: "SocialLinks" }
    ],
    attributes: { exclude: ["password"] },
    order: [[Guide, "updatedAt", "DESC"]]
  });
  if (!user) return res.status(401).send("User not found");
  res.send(user);
});

router.put("/description", auth, async (req, res) => {
  const { profileDescription } = req.body;
  const userId = req.user.id;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return res.status(404).send("User not found");
  user.profileDescription = profileDescription;
  await user.save();
  res.send(user);
});

router.get("/description/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return res.status(404).send("User not found");
  res.send(user.profileDescription);
});

router.put("/soclinks", auth, async (req, res) => {
  const { links } = req.body;
  const userId = req.user.id;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) return res.status(404).send("User not found");
  let socialLinks = await SocialLinks.findAll({ where: { userId: userId } });
  if (!socialLinks) socialLinks = [];

  let transaction;
  try {
    transaction = await sequelize.transaction();
    let i = 0;
    for (i = 0; i < socialLinks.length; i++) {
      if (i >= links.length) await socialLinks[i].destroy({ transaction });
      else {
        socialLinks[i].title = links[i].title;
        socialLinks[i].linkTo = links[i].linkTo;
        await socialLinks[i].save({ transaction });
      }
    }
    for (i; i < links.length; i++) {
      let soc = {
        title: links[i].title,
        linkTo: links[i].linkTo,
        userId
      };
      await SocialLinks.create(soc, { transaction });
    }
  } catch (err) {
    if (err) {
      await transaction.rollback();
      console.log("err :", err);
      res.status(500).send("Something went wrong");
    }
  }
  res.send(socialLinks);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("Wrong email or password");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).send("Wrong email or password");

  const sendUser = {
    id: user.id,
    firstName: user.firstName,
    email: user.email,
    username: user.username
  };
  const token = await jwt.sign(
    { email, id: user.id, username:user.username },
    process.env.JWT_SIGN_SERCRET
  );
  res.send({ user: sendUser, token });
});

router.post("/follow/:id", auth, async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;
  const follower = await User.findOne({ where: { id: followerId } });
  if (!follower) return res.status(404).send("User not found");

  const following = await User.findOne({ where: { id: followingId } });
  if (!following) return res.status(404).send("User not found");

  await follower.addFollowing(following);

  res.send(follower);
});

router.delete("/unfollow/:id", auth, async (req, res) => {
  const followerId = req.user.id;
  const followingId = req.params.id;
  const follower = await User.findOne({ where: { id: followerId } });
  if (!follower) return res.status(404).send("User not found");

  const following = await User.findOne({ where: { id: followingId } });
  if (!following) return res.status(404).send("User not found");

  await follower.removeFollowing(following);
  res.send(follower);
});

router.get("/isfollowing/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const isFollowingId = req.params.id;

  const follower = await User.findOne({ where: { id: userId } });
  if (!follower) return res.status(404).send("User not found");

  const result = await follower.getFollowing({ where: { id: isFollowingId } });
  if (result.length == 0) res.send(false);
  else res.send(true);
});

router.get("/guides/:id", async (req, res) => {
  const userId = req.params.id;
  let excludeGuide = req.body.excl;
  if (!excludeGuide) excludeGuide = "";
  const results = await Guide.findAll({
    where: {
      [Sequelize.Op.and]: [
        { userId },
        { id: { [Sequelize.Op.ne]: excludeGuide } }
      ]
    }
  });
  res.send(results);
});

module.exports = router;
