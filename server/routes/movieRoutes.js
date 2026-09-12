import express from "express";

import { search, details } from "../controllers/movieController.js";

const router = express.Router();

router.get("/search", search);
router.get("/:id", details);

export default router;
