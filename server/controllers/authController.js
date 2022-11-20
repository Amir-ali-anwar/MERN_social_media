import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
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
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !friends ||
    !location ||
    !occupation
  ) {
    throw new BadRequestError("Please Provide all the values");
  }
  const alreadyExist = User.findOne(email);
  if (alreadyExist) {
    throw new BadRequestError("Email already in use");
  }
  const user= await User.create(req.body)
  const token = user.CreateJWT();
  return res.status(StatusCodes.CREATED).json({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  },token);
};
const login = async (req, res) => {
  res.send("login");
};
export { login, register };
