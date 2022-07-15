import express from "express";
import userAuthRoute from "./userAuth.js"
import questionRoute from "./questionRoute.js"

const router = express.Router();

// AUTH ROUTE
router.use("/users/auth", userAuthRoute);
router.use("/discussion", questionRoute);



export default router;