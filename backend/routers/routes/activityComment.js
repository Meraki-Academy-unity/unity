const express = require("express");

const { addActivityComment,
    showAllCommentByActivityId,
    updateActivitiesComment
} = require("../controllers/activityComment");

const activitiesCommentsRouter = express.Router();

activitiesCommentsRouter.post("/", addActivityComment);
// get data by activities id
activitiesCommentsRouter.get("/:id", showAllCommentByActivityId);
//update using comment id 
activitiesCommentsRouter.put("/:id", updateActivitiesComment);

module.exports = activitiesCommentsRouter;
