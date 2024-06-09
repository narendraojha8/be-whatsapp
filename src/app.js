import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";

// import os from "os";console.log("no of cpus:",os.cpus().length)

//dotenv config
dotenv.config();

//create express app
const app = express();
// Morgan
app.use(morgan())

app.get('/home',(req,res)=>{
    res.send('this is first api...')
})

export default app;


