import express from "express";
import { aiAssistantHandler } from "../controllers/aiAssistantController.js";
import { auth, checkRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, checkRole(["admin"]), aiAssistantHandler);

export default router;
