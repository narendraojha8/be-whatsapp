import {messageModel} from "../models/indexModel.js";
import createError from 'node-http-error';
export const createMessage = async (msg)=>{
    let newMessage = await messageModel.create(msg);
    // await newMessage.save();
    if(!newMessage){
        createError("Oops something went wrong")
    }

    return newMessage;
}

export const populateMessage=async (id)=>{
  const msg = await messageModel.findById(id)
       .populate({
        path:"sender",
        select:"name picture",
        model:"userModel"
       })
       .populate({
        path:"conversation",
        select:"name isGroup users",
        model:"conversationModel",
        poulate:{
            path:"users",
            select:"name email picture status",
            model:"userModel"
        }
       });
       if (!msg) createError("Oops something went wrong");
       return msg;
  console.log(msg);
}

export const getConvomessages= async(convoId)=>{
    const msg = await messageModel.find({conversation:convoId})
    .populate("sender","name picture email status")
    .populate("conversation")
    if(!msg) {createError("Oops something went wrong")}
    return msg;
    

}