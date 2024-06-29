// import createHttpError from 'http-errors';
import createHttpError from "node-http-error";
import validator from 'validator';
import {userModel} from '../models/indexModel.js'
import bcrypt from "bcrypt"

export const createUser = async (user)=>{
    try {
        
    
    const {name,email,picture,status,password } = user;
    // check if fields are empty
    if(name ==""||email ==""||password==""){
        console.log("inside if")
        // throw new Error("please fill all fields")
      throw createHttpError("please fill all fields")
    }
    // Check name length
    if(!validator.isLength(name,{min:2,max:16})){
        throw createHttpError("Name should be between 2 and 16 characrers")
    }
    // check staus lenght
    if(status &&
        status.length>64){
        
    }
    // check if email is valid
    if(!validator.isEmail(email)){
        throw createHttpError("Please enter valid email")
    }
    // check if user already exist in database
    const userExists = await userModel.findOne({email})
    if(userExists){
        throw createHttpError("Email already exists")
        // return createHttpError(401,"Email already exists");
    }

    // check password
    // if(!validator.isLength(password,{min:6,max:10})){
    //     return createHttpError("Password must be min-6 characters and max-10 characters")
    // }
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedpassword = await bcrypt.hash(password,salt)
        const newuser = await new userModel({
            name,
            email,
            picture: picture||process.env.DEFAULT_PICTURE,
            status: status|| process.env.DEFAULT_STATUS,
            password:hashedpassword
        }).save();
        return newuser
    } catch (error) {
        // return createHttpError(error)
        throw(error) 
    }
} catch (error) {
    // next(error) 
    // console.log("catching ",error)
    throw error
}
    
    // 

}

export const signin = async(email,password)=>{
   try {
        if(email=="" || password ==""){
        throw createHttpError("Username and password is required");
    }
        const checkEmail = await userModel.findOne({email:email.toLowerCase()}).lean()
        if(!checkEmail){
           throw createHttpError("This email is not registered in our database");
        }
        const valpassword = await bcrypt.compare(password,checkEmail.password)
        if(!valpassword){
            throw createHttpError("Invalid password");
        }
        
        return checkEmail

   } catch (error) {
     throw error
   }
}