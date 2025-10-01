import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import cookieParser from "cookie-parser";

dotenv.config();

// import connectDB from "./db/connect.js";
import ReportRoute from "./Routes/ReportRoutes.js";

const app = express();
app.use(express.json());
const allowedOrigins = [
  "http://localhost:5173",
  "https://term.zenpix.shop"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api" , ReportRoute );

app.listen(5000, () => {
  console.log("server started");
});