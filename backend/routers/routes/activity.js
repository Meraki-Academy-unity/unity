const express = require("express");

const {
  addActivity,
  getAllActivities,
  getActivitiesById,
  deleteActivitiesById,
  updateActivitiesById,
  joinActivityById,
} = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id", addActivity);
//user_id
activitiesRouter.get("/:id", getAllActivities);
//activities_id
activitiesRouter.get("/activity/:id", getActivitiesById);
//activities_id
activitiesRouter.delete("/:id", deleteActivitiesById);
//activities_id
activitiesRouter.put("/:id", updateActivitiesById);
//activities_id
activitiesRouter.post("/activity/:id", joinActivityById);

module.exports = activitiesRouter;
