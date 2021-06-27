const express = require("express");

const friendListRouter = express.Router();

const {
  addFriend,
  deleteFriend,
  showFriendList,
} = require("../controllers/friendList");

friendListRouter.post("/:id", addFriend);
friendListRouter.delete("/:id", deleteFriend);
friendListRouter.get("/", showFriendList);

module.exports = friendListRouter;
