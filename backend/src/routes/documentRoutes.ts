import { Router } from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { createDocument, getDocuments } from "../controllers/documentController.js";

const router = Router();

router.post("/", authenticateToken, createDocument);
router.get("/", authenticateToken, getDocuments);

export default router;