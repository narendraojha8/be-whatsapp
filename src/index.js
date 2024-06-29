import mongoose from "mongoose"
import app from "./app.js"
import logger from "./configs/logger.js"

// env variables
// dotenv.config();
const PORT = process.env.PORT || 7000;
mongoose.connection.on("error",(err)=>{
    logger.error("Error connecting mongo db",err)
    process.exit(1)
})
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(res=>logger.info("Connected to mongodb"))
let server = app.listen(PORT,()=>{
    logger.info(`server is listening on port,${PORT} in ${process.env.NODE_ENV} MODE`)
    // throw new Error("unhandled errror")
});


// handle server errors
const exitHandler=()=>{
if(server){
    logger.info('Server closed');
    process.exit(1);
}else{
    process.exit(0);
}
}
const unexpectedErrorHandler=(error)=>{
    logger.error(error)
    exitHandler();
}
process.on("uncaughtException",unexpectedErrorHandler);
process.on("unhandledRejection",unexpectedErrorHandler);
// SIGTERM
process.on("SIGTERM",()=>{
    if(server){
        logger.info("Server closed sigterm");
        process.exit(1)
    }
})