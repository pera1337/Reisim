const express = require("express");
const router = express.Router();
const axios = require("axios");
const url = require("url");

router.get("/", async (req, res) => {
  const near = req.query.city;
  const limit = req.query.limit;
  const offset = req.query.offset;
  const route = "https://api.foursquare.com/v2/venues/explore?";
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    near,
    section: "sights",
	/*query:"tourist",*/
    limit,
    offset,
    v: "20180323"
  };
  try {
    const response = await axios.get(route + new url.URLSearchParams(params));
    const resData = response.data.response.groups[0].items;
    let sendData = [];
    resData.map(val => {
      const obj = {
        name: val.venue.name,
        lat: val.venue.location.lat,
        lng: val.venue.location.lng
      };
      sendData.push(obj);
    });
    return res.send(sendData);
  } catch (e) {
    return res.send([]);
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.query;
  const limit = req.query.limit;
  const near = req.query.city;
  const route = "https://api.foursquare.com/v2/venues/suggestcompletion?";
  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    near,
    limit,
    query,
    v: "20180323"
  };
  const response = await axios.get(route + new url.URLSearchParams(params));
  const resData = response.data.response.minivenues;
  let sendData = [];
  resData.map(val => {
    const obj = {
      name: val.name,
      lat: val.location.lat,
      lng: val.location.lng
    };
    sendData.push(obj);
  });
  res.send(sendData);
});

module.exports = router;
