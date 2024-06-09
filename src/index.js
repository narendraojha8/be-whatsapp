import app from "./app.js"
import logger from "./configs/logger.js"

// env variables
const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
    logger.info(`server is listening on port,${PORT} in ${process.env.NODE_ENV} MODE`)
});
