const express = require("express");

const {
  addActivity,
  getAllActivities,
  getActivitiesById,
  deleteActivitiesById,
  updateActivitiesById,
} = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id", addActivity);
//user_id
activitiesRouter.get("/:id", getAllActivities);
//activities_id
activitiesRouter.get("/getById/:id", getActivitiesById);
//activities_id
activitiesRouter.delete("/delete/:id", deleteActivitiesById);
//activities_id
activitiesRouter.put("/update/:id", updateActivitiesById);
module.exports = activitiesRouter;
