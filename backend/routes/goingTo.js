const express = require("express");
const router = express.Router();
const { GoingTo } = require("../models/models");
const auth = require("../middleware/auth");
const Sequelize = require("sequelize");

router.post("/:guideId", auth, async (req, res) => {
  const guideId = req.params.guideId;
  const { id } = req.user;
  const goingTo = await GoingTo.findOne({
    where: {
      [Sequelize.Op.and]: [{ guideId }, { userId: id }],
    },
  });
  if (goingTo)
    return res.status(401).send("User is already going to that event.");
  const going = await GoingTo.create({
    userId: id,
    guideId,
  });
  return res.send(going);
});

router.delete("/:guideId", auth, async (req, res) => {
  const guideId = req.params.guideId;
  const { id } = req.user;
  const goingTo = await GoingTo.findOne({
    where: {
      [Sequelize.Op.and]: [{ guideId }, { userId: id }],
    },
  });
  if (!goingTo) return res.status(401).send("User is not going to that event.");
  const returnGoing = goingTo;
  await goingTo.destroy();
  return res.send(returnGoing);
});

module.exports = router;
