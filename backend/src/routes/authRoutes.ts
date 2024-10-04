import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/PrismaClient";
import dotenv from "dotenv";

dotenv.config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const { email, username, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
    });
    res.json( { message: 'User created!' });
  } catch (err) {
    res.status(400).json({ error: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email }});

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET!);
        res.json( { token });
    }
    else {
        res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json({ error: "Error retrieving user" });
  }
});

export default router;