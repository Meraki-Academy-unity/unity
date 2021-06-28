const express = require("express");

const { addActivityComment,
    showAllCommentByActivityId
} = require("../controllers/activityComment");

const activitiesCommentsRouter = express.Router();

activitiesCommentsRouter.post("/:id", addActivityComment);
activitiesCommentsRouter.get("/:id", showAllCommentByActivityId);


module.exports = activitiesCommentsRouter;
