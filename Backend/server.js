import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoute from "./routes/User/user.js";
app.use(cors());

dotenv.config(); 
connectDB(); // 

const app = express();
console.log("Server starting...");

app.use(express.json());

app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
