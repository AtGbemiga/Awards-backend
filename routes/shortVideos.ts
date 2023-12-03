// import Router from express to create routes
import { Router } from "express";
const router = Router();

// import the function to be excuted from the controller
import { createShortVideo } from "../controllers/shortVideos/upload";
import {
  getLimitedInfo,
  getLimitedInfoForHome,
} from "../controllers/shortVideos/getLimitedInfo";
import { getFullInfo } from "../controllers/shortVideos/getFullInfo";
import { updateLikesCount } from "../controllers/shortVideos/updateLikesCount";
import { decreaseLikesCount } from "../controllers/shortVideos/decreaseLikeCount";
import { createComment } from "../controllers/shortVideos/createComment";
import { getShortVideosComments } from "../controllers/shortVideos/getComments";

// route path and function
router.post("/", createShortVideo);
router.get("/", getLimitedInfo);
router.get("/getFullInfo", getFullInfo);
router.put("/updateLikesCount", updateLikesCount);
router.put("/decreaseLikesCount", decreaseLikesCount);
router.post("/createComment", createComment);
router.get("/getShortVideosComments", getShortVideosComments);
router.get("/getLimitedInfoForHome", getLimitedInfoForHome);

// export router
export default router;
