import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movieRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Movie API server is running",
  });
});

app.use("/api/movies", movieRoutes);
app.use("/api/wishlist", wishlistRoutes);

export default app;
