import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/PrismaClient.js";

export const register = async (req: Request, res: Response) => {
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
    res.json({ message: "User created!", user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  try {  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );

  return res.json({ token, user });

  }
  catch (error) {
    console.log('Error login: ');
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
