const express = require("express");
const authentication = require("../middlewares/authentication");

const friendListRouter = express.Router();

const {
  addFriend,
  deleteFriend,
  showFriendList,
  cheakeFriends
} = require("../controllers/friendList");

friendListRouter.post("/:id", authentication, addFriend);
friendListRouter.delete("/:id", authentication, deleteFriend);
friendListRouter.get("/", showFriendList);
friendListRouter.get("/check/:id", authentication, cheakeFriends);


module.exports = friendListRouter;
