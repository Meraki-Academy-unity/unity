const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addActivity,
  getAllActivities,
  getAllActivitiesByUser,
  getActivitiesById,
  deleteActivitiesById,
  updateActivitiesById,
  joinActivityById,
  addActivityComment,
  showAllCommentByActivityId,
  updateActivitiesComment,
  deletActivitiesComment,
  withDrawActivityById,
  getMember,
  getMembers,
  getMyActivities,
} = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/", authentication, addActivity);
activitiesRouter.get("/all/user/:id", getAllActivitiesByUser);
activitiesRouter.get("/", authentication, getAllActivities);
activitiesRouter.get("/activity/:id", getActivitiesById);
activitiesRouter.delete("/:id", deleteActivitiesById);
activitiesRouter.put("/:id", updateActivitiesById);
activitiesRouter.post("/activity/:id", authentication, joinActivityById);
// post data by activity id
activitiesRouter.post("/comment/:id", authentication, addActivityComment);
// get data by activities id
activitiesRouter.get("/comment/:id", showAllCommentByActivityId);
//update using comment id
activitiesRouter.put("/comment/:id", authentication, updateActivitiesComment);
//delete using comment id
activitiesRouter.delete("/comment/:id", authentication, deletActivitiesComment);
// withdraw user from activity
activitiesRouter.delete("/activity/:id", authentication, withDrawActivityById);
// to get user joined in activity :
activitiesRouter.get("/member/:id", authentication, getMember);
// to get all users joined in activity :
activitiesRouter.get("/members/:id", getMembers);
activitiesRouter.get("/myProfile", authentication, getMyActivities);

module.exports = activitiesRouter;
