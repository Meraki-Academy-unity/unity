const express = require("express");
const authentication = require("../middlewares/authentication");

const MessagesRouter = express.Router();

const { showMessages, addMessages } = require("../controllers/messages");

MessagesRouter.post("/", authentication, addMessages);
MessagesRouter.get("/:room_id", showMessages);

module.exports = MessagesRouter;
