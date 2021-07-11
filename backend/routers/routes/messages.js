const express = require("express");
const authentication = require("../middlewares/authentication");

const MessagesRouter = express.Router();

const { showMessages, addMessages } = require("../controllers/messages");

MessagesRouter.post("/", authentication, addMessages);
MessagesRouter.get("/", authentication, showMessages);

module.exports = MessagesRouter;
