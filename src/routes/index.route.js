import express from 'express';
import authRoute from './auth.route.js'
import coversationRoute from './conversation.route.js'
import messageRoute from './message.route.js'
const router = express.Router();
router.use("/auth",authRoute);
router.use("/conversation",coversationRoute);
router.use("/message",messageRoute)
// router.use("")
export default router;
