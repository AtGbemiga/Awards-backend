import { Router } from "express";
const router = Router();

// import the function to be excuted from the controller
import { createClub } from "../controllers/club/createClub";
import { getClubById } from "../controllers/club/getClubById";
import { getClubOptions } from "../controllers/club/getClubOptions";
import createClubPost from "../controllers/club/createClubPost";

router.route("/").post(createClub);
router.route("/getClubById").get(getClubById);
router.route("/getClubOptions").get(getClubOptions);
router.route("/createClubPost").post(createClubPost);

export default router;
