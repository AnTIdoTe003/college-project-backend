import express from "express";
import dotnev from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import connectDb from "./config/connectDb.js";
import userRouter from "./routes/userRoute.js"
dotnev.config();

const app = express();

// connect to the database
connectDb();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/auth", userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
