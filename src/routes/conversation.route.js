import express from 'express';
import trimrequest from 'trim-request';
import { createOpenConversation } from '../controllers/conversation.controller.js';


const router = express.Router();

router.route("/").post(trimrequest.all,createOpenConversation);

export default router;