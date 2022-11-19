import mongoose from "mongoose";

const connectDB = (url) => {
  return mongoose.connect(url, {
    // useCreatendex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
export default connectDB