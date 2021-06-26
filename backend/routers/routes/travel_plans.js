const express = require("express");

const {createTravelPlans , getAllTravelPlans} = require("../controllers/travel_plans");
const travelPlansRouter = express.Router();
// we will use "/:id"  instead of "/" for development stage until the auth is ready to use , so we can retrieve users id from token instead of params
travelPlansRouter.post("/:id", createTravelPlans);
travelPlansRouter.get("/" , getAllTravelPlans )

module.exports = travelPlansRouter;