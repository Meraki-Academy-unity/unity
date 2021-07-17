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
  getMyPlans,
  getTravelPlansByUser,
} = require("../controllers/travel_plans");

const travelPlansRouter = express.Router();

travelPlansRouter.post("/", authentication, createTravelPlans);
travelPlansRouter.get("/", getAllTravelPlans);
travelPlansRouter.get("/:id", getTravelPlansById);
travelPlansRouter.get("/all/user/:id", getTravelPlansByUser);
travelPlansRouter.put("/:id", updateTravelPlansById);
travelPlansRouter.delete("/:id", deleteTravelPlansById);
travelPlansRouter.post("/plan/:id", authentication, joinTravelPlanById);
travelPlansRouter.delete("/plan/:id", authentication, withDrawTravelPlanById);
travelPlansRouter.get("/plans/:country", showTravelPlanByCountry);
travelPlansRouter.post("/comment/:id", authentication, addPlanComment);
travelPlansRouter.get("/comments/:id", showAllCommentByPlanId);
travelPlansRouter.put("/comment/:id", authentication, updatePlanComment);
travelPlansRouter.delete("/comment/:id", authentication, deletePlanComment);
travelPlansRouter.get("/member/:id", authentication, getMember);
travelPlansRouter.get("/members/:id", getMembers);
travelPlansRouter.get("/profile/plans", authentication, getMyPlans);

module.exports = travelPlansRouter;
