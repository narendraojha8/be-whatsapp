
export const createOpenConversation = async (req,res,next)=>{
    try {
        res.json('this is create open conversaion')
    } catch (error) {
        next(error)
    }
}