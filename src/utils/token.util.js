import jwt from 'jsonwebtoken';
import logger from '../configs/logger.js';
export const sign = (payload,secret,expiresIn)=>{
    return new Promise((resolve,reject)=>{
         jwt.sign(payload,secret,{expiresIn:expiresIn},function(err,res){
            if(err){
                logger.error("Issue while generating token")
                reject(err)
                
            }
            resolve(res)
            logger.info("token generated",res)
        })
        
    })
}