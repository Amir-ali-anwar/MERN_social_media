import mongoose from "mongoose";

const connectDB = (url) => {
  try {
    mongoose.connect(url, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
  return;
};
export default connectDB;
