const express = require("express");
const authentication = require ("../middlewares/authentication");

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
    getMembers
    
} = require("../controllers/activity");

const activitiesRouter = express.Router();

activitiesRouter.post("/", authentication , addActivity);
//user_id
activitiesRouter.get("/:id", getAllActivitiesByUser);

activitiesRouter.get("/" ,authentication ,getAllActivities)
//activities_id
activitiesRouter.get("/activity/:id", getActivitiesById);
//activities_id
activitiesRouter.delete("/:id", deleteActivitiesById);
//activities_id
activitiesRouter.put("/:id", updateActivitiesById);
//activities_id
activitiesRouter.post("/activity/:id",authentication, joinActivityById);
// post data by activity id
activitiesRouter.post("/comment/:id",authentication, addActivityComment);
// get data by activities id
activitiesRouter.get("/comment/:id", showAllCommentByActivityId);
//update using comment id 
activitiesRouter.put("/comment/:id",authentication,updateActivitiesComment);
//delete using comment id 
activitiesRouter.delete("/comment/:id",authentication, deletActivitiesComment);
// withdraw user from activity 
activitiesRouter.delete("/activity/:id",authentication, withDrawActivityById);
// to get user joined in activity :
activitiesRouter.get("/member/:id" ,authentication, getMember)
// to get all users joined in activity :
activitiesRouter.get("/members/:id" , getMembers)


module.exports = activitiesRouter;
