import express from "express";
import memeRouter from "./routes/meme.route.js";

const app = express();
const PORT = 5000;

// ✅ CORS Middleware (allow frontend)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Routes
app.use("/api", memeRouter);

app.listen(PORT, () => {
  console.log(`🚀 Bun server running at http://localhost:${PORT}`);
});
