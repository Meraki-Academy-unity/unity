const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  getUserById,
  getMyProfile,
  updateMyProfile,
} = require("../controllers/users.js");

const profileRouter = express.Router();

profileRouter.get("/user/:id", getUserById);
profileRouter.get("/myProfile", authentication, getMyProfile);
profileRouter.put("/myProfile", authentication, updateMyProfile);

module.exports = profileRouter;
