const express = require("express");

const { getUserById, getMyProfile } = require("../controllers/users.js");

const profileRouter = express.Router();

profileRouter.get("/:id", getUserById);
profileRouter.get("/myProfile", getMyProfile);

module.exports = profileRouter;
