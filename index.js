// index.js
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import session from "express-session";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import connectDB from "./Db/db.js";

// imported routes
import todoRoutes from "./RoutersApi/todosRoute.js";
import userRoutes from "./RoutersApi/userRoute.js";

const app = express();
dotenv.config({ path: ".env" });
const PORT = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware to parse JSON requests
app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'https://creators-io.vercel.app',
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);
// Session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true, maxAge: 24 * 60 * 60 * 1000 }, // Set to true if using HTTPS
//   })
// );
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));
// Route to create a new todo
app.use("/todos", todoRoutes); // Set up the /todos route
app.use("/user", userRoutes); // Set up the /todos route

// User logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.status(200).json("User logged out successfully");
  });
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
connectDB();
