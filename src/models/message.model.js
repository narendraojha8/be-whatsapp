import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    sender:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"userModel"
    },
    message:{
        type:String,
        trim:true,
    },
    conversation:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"conversationModel"
    },
    files:[]
},
{
    collection:"messages",
    timestamps:true
}
)
 const messageModel = mongoose.models.messageModel || mongoose.model('messageModel',messageSchema);
 export default messageModel;
