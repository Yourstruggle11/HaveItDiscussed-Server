import express from "express";
import userAuthRoute from "./userAuth.js"

const router = express.Router();

// AUTH ROUTE
router.use("/users/auth", userAuthRoute);


export default router;