const express = require("express");

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
  deletePlanComment
} = require("../controllers/travel_plans");
const travelPlansRouter = express.Router();
// we will use "/:id"  instead of "/" for development stage until the auth is ready to use , so we can retrieve users id from token instead of params
travelPlansRouter.post("/:user_id", createTravelPlans);
travelPlansRouter.get("/", getAllTravelPlans);
travelPlansRouter.get("/:id", getTravelPlansById);
travelPlansRouter.put("/:id", updateTravelPlansById);
travelPlansRouter.delete("/:id", deleteTravelPlansById);
travelPlansRouter.post("/plan/:id", joinTravelPlanById);
travelPlansRouter.delete("/plan/:id", withDrawTravelPlanById);
travelPlansRouter.get("/plans/:country", showTravelPlanByCountry);
travelPlansRouter.post("/comment/:id", addPlanComment);
travelPlansRouter.get("/comments/:id", showAllCommentByPlanId);
//update using comment id 
travelPlansRouter.put("/comment/:id", updatePlanComment);
//delete using comment id 
travelPlansRouter.delete("/comment/:id", deletePlanComment);

module.exports = travelPlansRouter;
