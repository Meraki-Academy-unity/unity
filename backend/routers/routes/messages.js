const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  showMessages,
  addMessages,
  inboxMessages,
} = require("../controllers/messages");

const MessagesRouter = express.Router();

MessagesRouter.post("/", authentication, addMessages);
MessagesRouter.get("/:room_id", authentication,showMessages);
MessagesRouter.get("/", authentication, inboxMessages);

module.exports = MessagesRouter;
