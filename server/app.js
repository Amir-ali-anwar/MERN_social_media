import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./db/Connect.js";
import "express-async-errors";
//Routes 
import authRoutes from './routes/authRoutes.js'
//Middlewares
import notFoundMiddlewalre from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
//rest of the packages
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'public/assets')
  },
  filename:function(req,file,cb){
    cb(null,file.originalname)
  }
})
// Routes Configurations
app.use("/api/v1/auth", authRoutes);

// Middlewares
app.use(notFoundMiddlewalre);
app.use(errorHandlerMiddleware);
const upload= multer({storage}) 
const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
