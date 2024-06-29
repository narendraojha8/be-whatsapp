import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types;

const ConversationSchema = mongoose.Schema({
    name:{
           type:String,
           required:[true,'Conversation is required'],
           trim:true,
        },
        isGroup:{
            type:Boolean,
            required:true,
            default:false
        },
        users:[{
            type:ObjectId,
            ref:"userModel"
        }],
        latestMessage:{
            type:ObjectId,
            ref:"messageModel"
        },
        admin:{
            type:ObjectId,
            ref:"userModel"
        }
},
{   collection:"conversation",
    timestamps:true
}
)
const conversationModel = mongoose.models.conversationModel || mongoose.model("conversationModel",ConversationSchema);
export default conversationModel;