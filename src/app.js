import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieparser from "cookie-parser";
import routes from './routes/index.route.js'
import createHttpError from "node-http-error";
// import os from "os";console.log("no of cpus:",os.cpus().length)

//dotenv config
dotenv.config();

//create express app
const app = express();
// Morgan
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieparser())
app.use(express.urlencoded({extended:true}));
app.use('/api/v1',routes);
app.get('/home',(req,res,next)=>{
    const err = createHttpError.
    res.send(err)
    next()
})

export default app;


