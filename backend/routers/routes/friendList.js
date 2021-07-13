const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addFriend,
  deleteFriend,
  showFriendList,
  cheakeFriends,
} = require("../controllers/friendList");

const friendListRouter = express.Router();

friendListRouter.post("/:id", authentication, addFriend);
friendListRouter.delete("/:id", authentication, deleteFriend);
friendListRouter.get("/", authentication, showFriendList);
friendListRouter.get("/check/:id", authentication, cheakeFriends);

module.exports = friendListRouter;
