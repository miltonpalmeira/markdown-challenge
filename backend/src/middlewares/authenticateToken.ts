import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomRequest } from "../interfaces/CustomRequest"; 

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json({ message: "Access Denied: No token provided" });
    return
  }

  jwt.verify(token, JWT_SECRET!, (err, user) => {
    if (err) { 
      res.status(403).json({ message: "Invalid Token" });
      return;
    }

    req.user = user;
    next();
  });
};
