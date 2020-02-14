const express = require("express");
const router = express.Router();
const { User } = require("../models/models");
const auth = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.user.id +
        Date.now().toString() +
        file.originalname.substring(
          file.originalname.indexOf("."),
          file.originalname.length
        )
    );
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    return cb(null, true);
  else return cb("Filetype not supported", false);
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  },
  fileFilter
});

let up = upload.single("profileImage");

router.post("/:id", auth, async (req, res) => {
  up(req, res, async error => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) return res.status(404).send("User not found");

    user.profileImage = req.file.path;
    await user.save();
    res.send(user.profileImage);
  });
});

router.put("/:id", auth, async (req, res) => {
  up(req, res, async error => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      fs.unlink(req.file.path, null);
      return res.status(404).send("User not found");
    }

    fs.unlink(user.profileImage, async error => {
      if (error) {
        fs.unlink(req.file.path, error => {
          console.log(error);
        });
        return res.status(500).send("Failed to delete old profile image");
      }
      user.profileImage = req.file.path;
      await user.save();
      return res.send(user.profileImage);
    });
  });
});

router.delete("/:id", auth, async (req, res) => {
  const user = await User.findOne({ where: { id: req.user.id } });
  if (!user) return res.status(404).send("User not found");

  fs.unlink(user.profileImage, async error => {
    if (error) return res.status(500).send("Failed to delete image");
    const sendPath = user.profileImage;
    user.profileImage = null;
    await user.save();
    res.send(sendPath);
  });
});

module.exports = router;
