import express from  'express';
import trimRequest from 'trim-request';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import {getMessages,sendMessage} from '../controllers/message.controller.js'
const router = express.Router();

router.route('/:convo_id').get(trimRequest.all,authMiddleware, getMessages);
router.route('/').post(trimRequest.all,authMiddleware,sendMessage)


export default router;
