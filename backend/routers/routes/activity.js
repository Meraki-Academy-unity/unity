const express = require("express");

const { addActivity, getAllActivities, getActivitiesById, deleteActivitiesById, updateActivitiesById } = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id", addActivity);
activitiesRouter.get("/:id", getAllActivities);
activitiesRouter.get("/getById/:id", getActivitiesById);
activitiesRouter.delete("/delete/:id", deleteActivitiesById);
activitiesRouter.put("/update/:id",updateActivitiesById);
module.exports = activitiesRouter;