const express = require("express");
const authentication = require('../middlewares/authentication')


const ImagesRouter = express.Router();

const { addImage,getImageByUserId,getImageByGestId } = require("../controllers/images");


ImagesRouter.post("/", authentication,addImage)
ImagesRouter.get("/", authentication,getImageByUserId);
ImagesRouter.get("/:id",getImageByGestId);

module.exports = ImagesRouter;
