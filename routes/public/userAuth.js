import express from "express";
import { authSocialUser } from "../../controllers/userAuth.controller.js";

const router = express.Router();

// AUTH 
router.route('/social').post(authSocialUser)


export default router;