import { Router, Response, NextFunction } from "express";
import prisma from "../../prisma/PrismaClient";
import { authenticateToken } from "../middlewares/authenticateToken";
import { CustomRequest } from "../interfaces/CustomRequest";

const router = Router();

router.get("/", authenticateToken, async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId: req.user?.id },
    });
    res.json(documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;