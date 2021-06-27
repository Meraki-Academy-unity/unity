const express = require("express");

const { addActivity, getAllActivities, getActivitiesById } = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id", addActivity);
activitiesRouter.get("/:id", getAllActivities);
activitiesRouter.get("/getById/:id", getActivitiesById);
module.exports = activitiesRouter;