const express = require("express");
const authentication = require("../middlewares/authentication");

const MessagesRouter = express.Router();

const {
  showMessages,
  addMessages,
  inboxMessages,
} = require("../controllers/messages");

MessagesRouter.post("/", authentication, addMessages);
MessagesRouter.get("/:room_id", showMessages);
MessagesRouter.get("/", authentication, inboxMessages);

module.exports = MessagesRouter;
