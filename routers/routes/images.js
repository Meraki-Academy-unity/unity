const express = require("express");
const authentication = require("../middlewares/authentication");

const {
  addImage,
  getImageByUserId,
  getImageByGestId,
} = require("../controllers/images");

const ImagesRouter = express.Router();

ImagesRouter.post("/", authentication, addImage);
ImagesRouter.get("/", authentication, getImageByUserId);
ImagesRouter.get("/:id", getImageByGestId);

module.exports = ImagesRouter;
