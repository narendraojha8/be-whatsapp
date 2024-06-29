import createerror from 'node-http-error';
import jwt from 'jsonwebtoken';
export function authMiddleware(req,res,next){
    if(!req.headers["authorization"]){
        return next(createerror(401,"not authorized."))
    }
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,payload)=>{
        if(err){
            return next(createerror(401,"not authorized."));
        }
        req.user = payload;
        console.log('req.user',req.user)
        next();
    });
}