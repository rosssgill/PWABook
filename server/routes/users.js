import express, { application } from "express";
import { signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin); // http://localhost:5000/users/signin;
router.post("/signup", signup); // http://localhost:5000/users/signup;

export default router;
