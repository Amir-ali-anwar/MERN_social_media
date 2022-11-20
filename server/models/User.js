import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "PLease enter your name"],
    },
    lastName: {
      type: String,
      required: [true, "PLease enter your name"],
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
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
  return jwt.sign({UserID: this._id,Username: this.firstName,},process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_LIFETIME,}
  );
};
const User = mongoose.model("User", UserSchema);
export default User;
