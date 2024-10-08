import { Request, Response } from "express";
import prisma from "../../prisma/PrismaClient.js";
import { CustomRequest } from "../interfaces/CustomRequest.js";

export const createDocument = async (req: CustomRequest, res: Response) => {
  const { content } = req.body;
  const userId = req.user?.id;
  const title = req.document?.title;

  const document = await prisma.document.create({
    data: {
      title,
      content,
      userId,
    },
  });

  res.status(201).json(document);
};

export const getDocuments = async (req: CustomRequest, res: Response) => {
  const documents = await prisma.document.findMany({
    where: { userId: req.user?.id },
  });

  res.json(documents);
};
