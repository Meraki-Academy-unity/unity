const express = require("express");

const {createTravelPlans} = require("../controllers/travel_plans");
const travelPlansRouter = express.Router();

travelPlansRouter.post("/", createTravelPlans);



module.exports = travelPlansRouter;