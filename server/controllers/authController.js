import User from '../models/User.js'
import StatusCodes from 'http-status-codes'

const register= async(req,res,next)=>{
     const {
       firstName,
       lastName,
       email,
       password,
       picturePath,
       friends,
       location,
       occupation,
     } = req.body;
    if (!firstName || !lastName ||!email ||!password|| friends || location || occupation) {
    const error= new Error('not available')
    error.status=404
     return next(error)
    } 
    res.status(200).json({success:true})
}
const login = async (req, res) => {
  res.send("login");
};
export { login, register };
