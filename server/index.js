import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// IMPORTANT: Webhook route BEFORE express.json()
app.use("/api/credits/webhook",
  express.raw({ type: "application/json" })
);

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json("hello world");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credits", creditRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});