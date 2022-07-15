import express from "express";
import verifyAuthToken from "./verifyAuthToken.js"
import questionRoute from "./questionRoute.js"
import {userRouteProtection} from "../../middlewares/authMiddleware.js"

const router = express.Router();

// AUTH ROUTE
router.use("/users/auth",userRouteProtection, verifyAuthToken);
router.use("/discussion",userRouteProtection, questionRoute);


export default router;