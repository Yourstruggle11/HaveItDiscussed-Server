import express from "express";
import verifyAuthToken from "./verifyAuthToken.js"
import questionRoute from "./questionRoute.js"
import commentRoute from "./commentRoute.js"
import {userRouteProtection} from "../../middlewares/authMiddleware.js"

const router = express.Router();

// AUTH ROUTE
router.use("/users/auth",userRouteProtection, verifyAuthToken);
router.use("/discussion",userRouteProtection, questionRoute);
router.use("/comments",userRouteProtection, commentRoute);


export default router;