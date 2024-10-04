import { Router } from "express";
import prisma from "../../prisma/PrismaClient";
import { authenticateToken } from "../middlewares/autheticateToken";

const router = Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: (req as any).user.id },
    });
    return res.json(documents);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;