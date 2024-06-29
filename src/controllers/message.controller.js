import logger from '../configs/logger.js'
import { populateMessage,createMessage,getConvomessages } from '../services/message.service.js';

export const getMessages = async(req,res,next)=>{
    try{
        const convo_id = req.params.convo_id;
        const messages = await getConvomessages(convo_id)
    }catch(error){
        next(error)
    }
}

export const sendMessage = async(req,res,next)=>{
    try{
        const user_id = req.user.userId;
        const {message,convo_id,files} = req.body;
        if(convo_id=='' || (message=='')){
            logger.error('Message or convo_id is required.')
            res.sendStatus(400);
        }
        const msgData ={
            sender:user_id,
            message:message,
            conversation:convo_id
        }
        let newMessage = await createMessage(msgData);
        let populatedMessage = await populateMessage(newMessage._id);
        res.json({'this is SendMessage':user_id,message,convo_id})
        // res.json('this is send message')
    }catch(error){
        next(error)
    }
}