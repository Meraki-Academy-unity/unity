const express = require("express");

const { addActivityComment } = require("../controllers/activityComment");

const activitiesCommentsRouter = express.Router();

activitiesCommentsRouter.post("/", addActivityComment);
module.exports = activitiesCommentsRouter;
