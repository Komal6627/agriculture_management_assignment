import express from "express";
import { analyzeField } from "../controllers/aiController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Route to get AI analysis
router.get("/analyze", authMiddleware, analyzeField);

export default router;
