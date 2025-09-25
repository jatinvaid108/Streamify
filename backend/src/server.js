import express from "express"
import "dotenv/config"
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // for deployment 
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import chatRoutes from "./routes/chat.route.js"

import {connectDB} from "./lib/db.js"
const app=express()
const PORT=process.env.PORT;

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true   //allow frontend to send cookies
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);   //---> First part done auth part over to next route 
app.use("/api/users",userRoutes);
app.use("/api/chat",chatRoutes);

// Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  });
}


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})