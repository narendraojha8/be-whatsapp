import { createUser } from "../services/auth.service.js";
import { generateToken} from '../services/token.service.js';
import { signin } from "../services/auth.service.js";
import createHttpError from "node-http-error";
import jwt from 'jsonwebtoken';
export const register = async(req,res,next)=>{
    try {
        const {name,email,picture,status,password } = req.body;
        
        const newuser=  await createUser({name,email,picture,status,password });
        
        
        const access_token = await generateToken({userId:newuser._id},process.env.ACCESS_TOKEN_SECRET,"1d")
        const refresh_token = await generateToken({userId:newuser._id},process.env.REFRESH_TOKEN_SECRET,"2d")
        res.cookie("refresh_token",refresh_token,
            {httpOnly:true,
             path:"/api/v1/auth/refreshtoken" ,
             maxAge:900000 
            })
       
        res.json({
            message:"User registered successfully",
            access_token,
            user:{
                id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                picture:newuser.picture,
                status:newuser.status,
                status:newuser.status,
            }
        }
        )
        // res.json(newuser)
        
    } catch (error) {
        res.json(error)
        next(error)
    }
}

export const login = async(req,res,next)=>{
    try {
        const { username ,password} = req.body;
        const newuser = await signin(username,password);
        const access_token = await generateToken({userId:newuser._id},process.env.ACCESS_TOKEN_SECRET,"1d")
        const refresh_token = await generateToken({userId:newuser._id},process.env.REFRESH_TOKEN_SECRET,"2d")
        res.cookie("refresh_token",refresh_token,
            {httpOnly:true,
             path:"/api/v1/auth/refreshtoken" ,
             maxAge:900000 
            })
       
        res.json({
            message:"Login success",
            access_token,
            user:{
                id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                picture:newuser.picture,
                status:newuser.status,
                status:newuser.status,
            }
        }
        )
    } catch (error) {
        res.json(error)
        next(error)
    }
}

export const logout = async(req,res,next)=>{
    try {
        res.clearCookie("refresh_token",{path:"/api/v1/auth/refreshtoken"});
        res.json({
            message:"logout success",
        })
        
    } catch (error) {
        next(error)
    }
}
export const refreshToken = async(req,res,next)=>{
    try {
        // res.cookie.refresh_token
        const token = req.cookies.refresh_token
        if(!token){
            throw createHttpError(401,"Please Login")
        }
        jwt.verify(token,process.env.REFRESH_TOKEN_SECRET,(error,payload)=>{
            if(error) throw createHttpError(401,"Invalid token");
            res.json(payload)
                

        })
        // console.log("t",t)
        // res.send({"this cookie":token})
    } catch (error) {
        res.json(error)
        next(error)
    }
}