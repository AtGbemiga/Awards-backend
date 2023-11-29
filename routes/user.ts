// import Router from express to create routes
import { Router } from "express";
const router = Router();

// import the necessary functions from comments controller
import { createUser } from "../controllers/users/createUser";
import { loginUser } from "../controllers/users/login";

// route path and function
router.post("/", createUser);
router.post("/login", loginUser);

// export router
export default router;
