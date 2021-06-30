const express = require("express");

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
    withDrawActivityById
} = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/:id", addActivity);
//user_id
activitiesRouter.get("/:id", getAllActivitiesByUser);

activitiesRouter.get("/" , getAllActivities)
//activities_id
activitiesRouter.get("/activity/:id", getActivitiesById);
//activities_id
activitiesRouter.delete("/:id", deleteActivitiesById);
//activities_id
activitiesRouter.put("/:id", updateActivitiesById);
//activities_id
activitiesRouter.post("/activity/:id", joinActivityById);
// post data by activity id
activitiesRouter.post("/comment/:id", addActivityComment);
// get data by activities id
activitiesRouter.get("/comment/:id", showAllCommentByActivityId);
//update using comment id 
activitiesRouter.put("/comment/:id", updateActivitiesComment);
//delete using comment id 
activitiesRouter.delete("/comment/:id", deletActivitiesComment);
// withdraw user from activity 
activitiesRouter.delete("/activity/:id", withDrawActivityById);
module.exports = activitiesRouter;
