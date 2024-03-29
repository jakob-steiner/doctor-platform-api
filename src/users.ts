import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
    try {
        const docs = await prisma.users.findMany();
        res.send({
          'status': 200,
          'users': docs
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Ärzte:', error);
        res.status(500).json({ error: 'Interner Serverfehler.' });
    }
};