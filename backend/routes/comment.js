const express = require("express");
const router = express.Router();
const { Comment, Guide, User } = require("../models/models");
const auth = require("../middleware/auth");

router.post("/new", auth, async (req, res) => {
  const { id } = req.user;
  const { text, parentId, guideId } = req.body;
  const guide = await Guide.findOne({ where: { id: guideId } });
  if (!guide) return res.status(404).send("Guide not found");
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).send("User not found");
  let comment = {
    text,
    authorId: user.id,
    guideId,
  };
  if (parentId) comment.parentId = parentId;
  let retComment = await Comment.create(comment);
  res.send(retComment);
});

router.put("/:id", auth, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const { text, parentId } = req.body;
  const comment = await Comment.findOne({ where: { id } });
  if (!comment) return res.status(404).send("Comment not founr");
  if (user !== comment.authorId) return res.status(403).send("Forbidden");
  if (parentId !== comment.parentId)
    return res.status(401).send("Cannot change parent");
  comment.text = text;
  await comment.save();
  res.send(comment);
});

router.delete("/:id", auth, async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const comment = await Comment.findOne({ where: { id } });
  if (comment.authorId !== user) res.status(403).send("Cannot delete comment.");
  let sendComment = comment;
  await comment.destroy();
  res.send(comment);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const comment = await Comment.findOne({ whwre: { id } });
  if (!comment) res.status(404).send("Comment not found");
  res.send(comment);
});

module.exports = router;
