import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import cookieParser from "cookie-parser";

dotenv.config();

// import connectDB from "./db/connect.js";
import ReportRoute from "./Routes/ReportRoutes.js";

const app = express();
app.use(express.json());
app.use(cors(
  {
    origin: "https://term.zenpix.shop",
    credentials: true
  }
));
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api" , ReportRoute );

app.listen(5000, () => {
  console.log("server started");
});