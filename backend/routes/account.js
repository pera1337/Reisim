const express = require("express");
const router = express.Router();
const { User, Guide } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) return res.status(401).send("User already exists");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password
  });

  const sendUser = {
    id: newUser.id,
    firstName: newUser.firstName,
    email: newUser.email
  };
  const token = await jwt.sign(
    { email, id: newUser.id },
    process.env.JWT_SIGN_SERCRET
  );
  res.send({ user: sendUser, token });
});

router.put("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("User not found");

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  user.firstName = firstName;
  user.lastName = lastName;
  user.password = password;

  await user.save();
  const sendUser = {
    id: user.id,
    firstName: user.firstName,
    email: user.email
  };

  res.send(sendUser);
});

router.delete("/", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).send("User not found");

  const returnUser = user;
  await user.destroy();
  res.send(returnUser);
});

router.get("/:id", async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    include: { model: Guide, as: "Guides" }
  });
  if (!user) return res.status(401).send("User not found");

  res.send(user);
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
    email: user.email
  };
  const token = await jwt.sign(
    { email, id: user.id },
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

module.exports = router;
