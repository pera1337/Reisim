const express = require("express");
const router = express.Router();
const { User, Location, Guide, Rating } = require("../models/models");
const auth = require("../middleware/auth");

router.post("/new", auth, async (req, res) => {
  const { id } = req.user;
  const { title, description, coords } = req.body;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(401).send("User not found");

  const guide = await Guide.create({
    title,
    description,
    userId: user.id
  });

  coords.forEach(async element => {
    await Location.create({
      lat: element.lat,
      lng: element.lng,
      guideId: guide.id
    });
  });

  res.send(`Successfully created guide:${guide.title}`);
});

router.get("/:id", async (req, res) => {
  const guide = await Guide.findOne({
    where: { id: req.params.id },
    include: [{ model: Location, as: "Locations" }, { model: User, as: "User" }]
  });
  if (!guide) return res.status(404).send("Guide not found");

  res.send(guide);
});

router.put("/:id", auth, async (req, res) => {
  const user = req.user;
  const { title, description, coords } = req.body;
  const guide = await Guide.findOne({ where: { id: req.params.id } });
  if (!guide) return res.status(404).send("Guide not found");

  if (guide.userId != user.id) return res.status(403).send("Foribidden");
  let locations = await Location.findAll({
    where: { guideId: req.params.id }
  });
  if (!locations) return res.status(404).send("Locations not found");

  let transaction;
  try {
    transaction = await sequelize.transaction();

    guide.title = title;
    guide.description = description;
    await guide.save({ transaction });
    let i = 0;
    for (i = 0; i < locations.length; i++) {
      if (i >= coords.length) await locations[i].destroy({ transaction });
      else {
        locations[i].lat = coords[i].lat;
        locations[i].lng = coords[i].lng;
        await locations[i].save({ transaction });
      }
    }
    for (i; i < coords.length; i++) {
      await Location.create(
        {
          lat: coords[i].lat,
          lng: coords[i].lng,
          guideId: guide.id
        },
        { transaction }
      );
    }

    await transaction.commit();
  } catch (err) {
    if (err) {
      await transaction.rollback();
      console.log("err :", err);
      res.status(500).send("Something went wrong");
    }
  }

  res.send(guide);
});

router.delete("/:id", auth, async (req, res) => {
  const user = req.user;
  const guide = await Guide.findOne({ where: { id: req.params.id } });
  if (!guide) return res.status(404).send("Guide not found");

  if (guide.userId != user.id) return res.status(403).send("Foribidden");

  let returnGuide = guide;
  try {
    await guide.destroy();
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
  res.send(returnGuide);
});

router.put("/rate/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const { rating } = req.body;
  const id = req.params.id;
  const guide = await Guide.findOne({ where: { id } });
  if (!guide) return res.status(404).send("Guide not found");

  let avgRating = guide.avgRating;
  let numOfRatings = guide.numOfRatings;
  let num = avgRating * numOfRatings;

  const guideRating = await Rating.findOne({ where: { userId, guideId: id } });
  if (guideRating) {
    num -= guideRating.rating;
    numOfRatings--;
  }

  num += parseFloat(rating);
  numOfRatings++;
  avgRating = parseFloat(num) / parseFloat(numOfRatings);

  guide.avgRating = avgRating;
  guide.numOfRatings = numOfRatings;

  let transaction;
  try {
    transaction = await sequelize.transaction();
    await guide.save({ transaction });
    if (guideRating) {
      guideRating.rating = Number(rating);
      await guideRating.save({ transaction });
    } else {
      await Rating.create(
        {
          userId,
          guideId: id,
          rating
        },
        { transaction }
      );
    }
    await transaction.commit();
  } catch (err) {
    return res.status(500).send("Something went wrong.");
  }

  res.send(guide);
});

router.get("/rated/:id", auth, async (req, res) => {
  const userId = req.user.id;
  const guideId = req.params.id;
  const guideRating = await Rating.findOne({ where: { userId, guideId } });
  if (!guideRating) return res.send({});
  else{
  res.send(guideRating);
  }
});

router.get("/", async (req, res) => {
  const guide = await Guide.findAll({ include: { model: User, as: "User" } });
  res.send(guide);
});

module.exports = router;
