const express = require("express");
const router = express.Router();
const {
  User,
  Location,
  Guide,
  GoingTo,
  Rating,
  City,
  Comment,
} = require("../models/models");
const auth = require("../middleware/auth");
const { subMonths } = require("date-fns");
const Sequelize = require("sequelize");
const {
  findClosesWeekly,
  closestWeekly,
  findClosestDaily,
  closestDaily,
  findClosestMonthly,
  closestMonthly,
  findNextDaily,
  findNextWeekly,
  findNextMonthly,
} = require("../utils/closest");

router.post("/new", auth, async (req, res) => {
  const { id } = req.user;
  const {
    title,
    description,
    coords,
    cities,
    organized,
    guideType,
    guideTimes,
    startTime,
    endTime,
  } = req.body;
  console.log(req.body);
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(401).send("User not found");
  if (coords.length === 0)
    return res.status(401).send("You must have at least one location");
  if (cities.length === 0)
    return res.status(401).send("You must have at least one city");
  const guide = await Guide.create({
    title,
    description,
    userId: user.id,
    organized,
    guideType,
    guideTimes,
    startTime,
    endTime,
  });

  coords.forEach(async (element) => {
    let location = {
      lat: element.lat,
      lng: element.lng,
      guideId: guide.id,
      locationNumber: element.locationNumber,
    };
    if (element.name) location.name = element.name;
    if (element.description) location.description = element.description;
    await Location.create(location);
  });

  cities.forEach(async (element) => {
    await City.create({
      name: element.name,
      full_name: element.full_name,
      guideId: guide.id,
    });
  });
  res.send({ id: guide.dataValues.id });
});

router.get("/going", auth, async (req, res) => {
  const userId = req.user.id;
  const now = Date.now();
  const nowDate = new Date(now);
  const monthBefore = subMonths(nowDate, 1);
  const guides = await GoingTo.findAll(
    {
      where: {
        createdAt: { [Sequelize.Op.between]: [monthBefore, nowDate] },
      },
      include: { model: Guide, as: "Guide" ,include:[{model:User,as:"User"}]},
    }
    // { include: { model: Guide, as: "Guide" } }
  );
  const filteredGuides = guides
    .filter((el) => {
      let closestDate;
      if (el.Guide.guideType === "Daily") closestDate = closestDaily(el.Guide);
      else if (el.Guide.guideType === "Weekly") {
        closestDate = closestWeekly(el.Guide);
        console.log(closestDate);
      } else closestDate = closestMonthly(el.Guide);

      return el.createdAt > closestDate && el.createdAt <= nowDate;
    })
    .sort((el1, el2) => {
      let cl1;
      let cl2;
      if (el1.Guide.guideType === "Daily") cl1 = findNextDaily(el1.Guide);
      else if (el1.Guide.guideType === "Weekly")
        cl1 = findNextWeekly(el1.Guide);
      else cl1 = findNextMonthly(el1.Guide);

      if (el2.Guide.guideType === "Daily") cl2 = findNextDaily(el2.Guide);
      else if (el2.Guide.guideType === "Weekly")
        cl2 = findNextWeekly(el2.Guide);
      else cl2 = findNextMonthly(el2.Guide);

      if (cl1 > cl2) return 1;
      else if (cl2 > cl1) return -1;
      else return 0;
    });
  const retGuides = filteredGuides.map((el) => {
    const guide = { ...el.Guide.dataValues };
    console.log(guide);
    if (el.Guide.guideType === "Daily")
      guide.nextTour = findNextDaily(el.Guide);
    else if (el.Guide.guideType === "Weekly")
      guide.nextTour = findNextWeekly(el.Guide);
    else guide.nextTour = findNextMonthly(el.Guide);
    el.Guide.asd = "ASD";
    return guide;
  });
  res.send(retGuides);
});

router.get("/top", async (req, res) => {
  const offset = req.query.offset;
  const limit = req.query.limit;
  const guides = await Guide.findAll({
    include: {
      model: User,
      as: "User",
      attributes: ["id", "firstName", "lastName", "profileImage", "username"],
    },
    order: [["avgRating", "DESC"]],
    limit: Number(limit),
    offset: Number(offset),
  });
  res.send(guides);
});

router.get("/search", async (req, res) => {
  let { city, name, text, rating, username, offset, limit } = req.query;
  if (!city) city = "";
  if (!name) name = "";
  if (!text) text = "";
  if (!username) username = "";
  const guides = await Guide.findAll({
    include: [
      { model: Location, as: "Locations" },
      {
        model: User,
        as: "User",
        where: {
          [Sequelize.Op.and]: [
            {
              [Sequelize.Op.or]: [
                { firstName: { [Sequelize.Op.substring]: name } },
                { lastName: { [Sequelize.Op.substring]: name } },
              ],
            },
            { username: { [Sequelize.Op.substring]: username } },
          ],
        },
      },
      {
        model: City,
        as: "Cities",
        where: { full_name: { [Sequelize.Op.substring]: city } },
      },
    ],
    where: {
      [Sequelize.Op.or]: [
        {
          title: { [Sequelize.Op.substring]: text },
        },
        {
          description: { [Sequelize.Op.substring]: text },
        },
      ],
      avgRating: { [Sequelize.Op.gte]: Number(rating) },
    },
    offset: Number(offset),
    limit: Number(limit),
  });
  res.send(guides);
});
router.get("/:id", async (req, res) => {
  const guide = await Guide.findOne({
    where: { id: req.params.id },
    include: [
      { model: Location, as: "Locations" },
      { model: User, as: "User" },
      { model: City, as: "Cities" },
      { model: Comment, as: "Comments" },
    ],
    order: [[Location, "locationNumber"]],
  });
  let going = {};
  if (!guide) return res.status(404).send("Guide not found");
  switch (guide.guideType) {
    case "Daily":
      going = await findClosestDaily(guide);
      guide.dataValues.nextDate = findNextDaily(guide);
      break;
    case "Weekly":
      going = await findClosesWeekly(guide);
      guide.dataValues.nextDate = findNextWeekly(guide);
      break;
    case "Monthly":
      going = await findClosestMonthly(guide);
      guide.dataValues.nextDate = findNextMonthly(guide);
      break;

    default:
      break;
  }
  res.send({ guide, going });
});

router.put("/:id", auth, async (req, res) => {
  const user = req.user;
  const {
    title,
    description,
    coords,
    cities,
    organized,
    guideType,
    guideTimes,
    startTime,
    endTime,
  } = req.body;
  const guide = await Guide.findOne({ where: { id: req.params.id } });
  if (!guide) return res.status(404).send("Guide not found");

  if (guide.userId != user.id) return res.status(403).send("Foribidden");
  let locations = await Location.findAll({
    where: { guideId: req.params.id },
  });
  let cits = await City.findAll({
    where: { guideId: req.params.id },
  });
  if (!locations) return res.status(404).send("Locations not found");
  if (!cits) return res.status(404).send("Cities not found");
  if (coords.length === 0)
    return res.status(401).send("You must have at least one location");
  if (cities.length === 0)
    return res.status(401).send("You must have at least one city");
  let transaction;
  try {
    transaction = await sequelize.transaction();

    guide.title = title;
    guide.description = description;
    guide.organized = organized;
    guide.guideType = guideType;
    guide.guideTimes = guideTimes;
    guide.startTime = startTime;
    guide.endTime = endTime;
    await guide.save({ transaction });
    let i = 0;
    for (i = 0; i < locations.length; i++) {
      if (i >= coords.length) await locations[i].destroy({ transaction });
      else {
        locations[i].lat = coords[i].lat;
        locations[i].lng = coords[i].lng;
        locations[i].locationNumber = coords[i].locationNumber;
        if (coords[i].name) locations[i].name = coords[i].name;
        if (coords[i].description)
          locations[i].description = coords[i].description;
        await locations[i].save({ transaction });
      }
    }
    for (i; i < coords.length; i++) {
      let loc = {
        lat: coords[i].lat,
        lng: coords[i].lng,
        guideId: guide.id,
        locationNumber: coords[i].locationNumber,
      };
      if (coords[i].name) loc.name = coords[i].name;
      if (coords[i].description) loc.description = coords[i].description;
      await Location.create(loc, { transaction });
    }

    i = 0;
    for (i = 0; i < cits.length; i++) {
      if (i >= cities.length) await cits[i].destroy({ transaction });
      else {
        cits[i].name = cities[i].name;
        cits[i].full_name = cities[i].full_name;
        await cits[i].save({ transaction });
      }
    }
    for (i; i < cities.length; i++) {
      await City.create(
        {
          name: cities[i].name,
          full_name: cities[i].full_name,
          guideId: guide.id,
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
          rating,
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
  else {
    res.send(guideRating);
  }
});

router.get("/similar/:id", async (req, res) => {
  const guideId = req.params.id;
  const cities = await City.findAll({ where: { guideId } });
  if (!cities) res.status(404).send("Not cities found");
  let names = [];
  cities.map((el) => names.push(el.name));
  const similar = await sequelize.query(
    `SELECT guideId as id,userId,title,guides.createdAt,numOfRatings,avgRating,firstName,lastName,profileImage,username
     from(select guideId,name from diplomski.cities as common where name in (:names) and guideId!=:gId) as result
	 inner join diplomski.guides on result.guideId = guides.id
     inner join diplomski.users on guides.userId=users.id
     group by guideId
     order by count(1) desc
     limit 8`,
    {
      replacements: { names, gId: Number(guideId) },
      type: Sequelize.QueryTypes.SELECT,
    }
  );
  res.send(similar);
});

// router.get("/going", auth, async (req, res) => {
//   const userId = req.user.id;
//   const now = Date.now();
//   const nowDate = new Date(now);
//   const monthBefore = subMonths(nowDate, 1);
//   const guides = await GoingTo.findAll(
//     {
//       where: {
//         createdAt: { [Sequelize.Op.between]: [monthBefore, nowDate] },
//       },
//     }
//     { include: [{ model: Guide, as: "Guide" }] }
//   );
//   console.log("RETURNED GUIDES , ", guides);
//   const filteredGuides = guides
//     .filter((el) => {
//       let closestDate;
//       if (el.Guide.guideType === "Daily") closestDate = closestDaily(el.Guide);
//       else if (el.Guide.guideType === "Weekly")
//         closestDate = closestWeekly(el.Guide);
//       else closestDate = closestMonthly(el.Guide);

//       return el.createdAt > closestDaily && el.createdAt <= nowDate;
//     })
//     .sort((el1, el2) => {
//       let cl1;
//       let cl2;
//       if (el1.Guide.guideType === "Daily") cl1 = findNextDaily(el1.Guide);
//       else if (el1.Guide.guideType === "Weekly")
//         cl1 = findNextWeekly(el1.Guide);
//       else cl1 = findNextMonthly(el1.Guide);

//       if (el2.Guide.guideType === "Daily") cl2 = findNextDaily(el2.Guide);
//       else if (el2.Guide.guideType === "Weekly")
//         cl2 = findNextWeekly(el2.Guide);
//       else cl2 = findNextMonthly(el2.Guide);

//       if (cl1 > cl2) return 1;
//       else if (cl2 > cl1) return -1;
//       else return 0;
//     });
//   res.send(filteredGuides);
// });

router.get("/", async (req, res) => {
  const guide = await Guide.findAll({ include: { model: User, as: "User" } });
  res.send(guide);
});

module.exports = router;
