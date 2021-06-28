const express = require("express");

const { addActivityComment,
    showAllCommentByActivityId,
    updateActivitiesComment,
    deletActivitiesComment
} = require("../controllers/activityComment");

const activitiesCommentsRouter = express.Router();
// post data by activity id
activitiesCommentsRouter.post("/:id", addActivityComment);
// get data by activities id
activitiesCommentsRouter.get("/:id", showAllCommentByActivityId);
//update using comment id 
activitiesCommentsRouter.put("/:id", updateActivitiesComment);
//delete using comment id 
activitiesCommentsRouter.delete("/:id", deletActivitiesComment);

module.exports = activitiesCommentsRouter;
