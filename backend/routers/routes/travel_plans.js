const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  createTravelPlans,
  getAllTravelPlans,
  getTravelPlansById,
  updateTravelPlansById,
  deleteTravelPlansById,
  joinTravelPlanById,
  withDrawTravelPlanById,
  showAllCommentByPlanId,
  addPlanComment,
  showTravelPlanByCountry,
  updatePlanComment,
  deletePlanComment,
  getMember,
  getMembers,
  getMyPlans
} = require("../controllers/travel_plans");
const travelPlansRouter = express.Router();
// we will use "/:id"  instead of "/" for development stage until the auth is ready to use , so we can retrieve users id from token instead of params
travelPlansRouter.post("/",authentication, createTravelPlans);
travelPlansRouter.get("/", getAllTravelPlans);
travelPlansRouter.get("/:id", getTravelPlansById);
travelPlansRouter.put("/:id", updateTravelPlansById);
travelPlansRouter.delete("/:id", deleteTravelPlansById);
travelPlansRouter.post("/plan/:id", authentication, joinTravelPlanById);
travelPlansRouter.delete("/plan/:id", authentication, withDrawTravelPlanById);
travelPlansRouter.get("/plans/:country", showTravelPlanByCountry);
travelPlansRouter.post("/comment/:id", authentication, addPlanComment);
travelPlansRouter.get("/comments/:id", showAllCommentByPlanId);
//update using comment id 
travelPlansRouter.put("/comment/:id", authentication, updatePlanComment);
//delete using comment id 
travelPlansRouter.delete("/comment/:id", authentication, deletePlanComment);
travelPlansRouter.get("/member/:id", authentication, getMember)
travelPlansRouter.get("/members/:id", getMembers)
travelPlansRouter.get("/allMyProfile", authentication, getMyPlans)



module.exports = travelPlansRouter;
