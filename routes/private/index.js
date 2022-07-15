import express from "express";
import verifyAuthToken from "./verifyAuthToken.js"

const router = express.Router();

// AUTH ROUTE
router.use("/users/auth", verifyAuthToken);


export default router;