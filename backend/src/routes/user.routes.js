import {Router} from 'express';
import {registerUser, logoutUser,loginUser, refreshAccessToken, getWatchHistory,updateAccountDetails,   changeCurrentPassword, getCurrentUser, getUserChannelProfile} from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middlewares.js"
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { get } from 'mongoose';

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
    );

// secured routes
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt,logoutUser);
router.route("/change-password").post(verifyJwt,   changeCurrentPassword)
router.route('/current-user').get(verifyJwt, getCurrentUser)
router.route("/c/:username").get(verifyJwt,getUserChannelProfile)
router.route("/update-account").patch(verifyJwt, updateAccountDetails)
router.route("/history").get(verifyJwt, getWatchHistory)

export default router;
