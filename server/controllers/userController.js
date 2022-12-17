import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const getUser = async (req, res) => {
  res.send("getuser");
};

const getUserFriends = async (req, res) => {
  res.send("getUserFriends");
};

const addRemoveFriend = (req, res) => {
  res.send("addRemoveFriend");
};

export { getUser, getUserFriends, addRemoveFriend };