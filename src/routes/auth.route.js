import express from 'express';
import { register,login,logout,refreshToken } from '../controllers/auth.controller.js';
import trimrequest from 'trim-request';
const router = express.Router();


router.route("/register").post(trimrequest.all,register);
router.route("/login").post(trimrequest.all,login);
router.route("/logout").post(trimrequest.all,logout);
router.route("/refreshtoken").post(trimrequest.all,refreshToken);

export default router;
