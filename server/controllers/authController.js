import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
const register = async (req, res, next) => {
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
  if (!firstName ||!lastName ||!email ||!password ||!friends ||!location ||!occupation) {
    throw new BadRequestError("Please Provide all the values");
  }
  const alreadyExist = await User.findOne({email});
  if (alreadyExist) {
    throw new BadRequestError("Email already in use");
  }
  const user= await User.create(req.body)
  const token = user.CreateJWT();
  res.status(StatusCodes.CREATED).json({ User: { firstName: user.firstName,email:user.email }, token });
};
const login = async (req, res) => {
  const {email,password}= req.body
  if(!email || !password){
    throw new BadRequestError("Please enter your email and password");
  }
  const checkEmail= await User.findOne({email});
  if (!checkEmail) {
    throw new UnauthenticatedError("Email does not exist");
  }
  const comparePassword = await checkEmail.ComparePassword(password);
  if(!comparePassword){
    throw new UnauthenticatedError("Password does not match");
  }
  const token= await checkEmail.CreateJWT()
  res.status(StatusCodes.OK).json({ user: { UserName: checkEmail.firstName }, token });
};
export { login, register };
