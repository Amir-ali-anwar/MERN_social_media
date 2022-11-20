import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your name"],
      minlength: 3,
      maxlength: 10,
    },
    lastName: {
      type: String,
      required: [true, "Please enter your name"],
      minlength: 3,
      maxlength: 10,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide valid email",
      },
      minlength: 5,
      maxlength: 20,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// jwt.sign(payload, secretOrPrivateKey, [options, callback])
UserSchema.methods.CreateJWT = function () {
  return jwt.sign(
    { UserID: this._id, Username: this.firstName,Email:this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};
const User = mongoose.model("User", UserSchema);
export default User;
