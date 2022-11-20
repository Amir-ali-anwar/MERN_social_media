import { StatusCodes } from "http-status-codes";


const errorHandlerMiddleware=(err,req,res,next)=>{
    console.log(err);
    res.status(err.status).json({ msg: "something went wrong" });
}
export default errorHandlerMiddleware