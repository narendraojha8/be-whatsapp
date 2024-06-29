
import mongoose from 'mongoose';

import validator from 'validator';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide the name'],
        validate:[validator.isAlpha,'Name should be only alphabets']
    },
    email: {
        type: String,
        required: [true, 'Please provide the email'],
        unique:[true,"This email is already taken"],
        lowercase:true,     
        validate: [validator.isEmail, "Please enter valid email"]
    },
    picture: {
        type: String,
        default:process.env.DEFAULT_PICTURE
    },
    status:{
        type:String,
        default:"Hey ! there I am using whatsapp"
    },
    password:{
        type:String,
        required:[true,'Please provide valid password'],
        minLength:[2,'Password should of min lenght 2 characters'],
        maxLength:[100,'Password should of max lenght 10 characters']
    },
    
    
},{
    collection:"users",
    timestamps:true
}
);
const userModel = mongoose.model.userModel || mongoose.model('userModel',userSchema);
export default userModel;