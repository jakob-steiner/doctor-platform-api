import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const docs = await prisma.doctors.findMany();
    res.send({
      status: 200,
      docs: docs,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Ärzte:", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.docs || !Array.isArray(req.body.docs)) {
      return res.status(400).json({ error: "Ungültiges JSON-Format." });
    }

    const docs = req.body.docs;
    console.log("Empfangene Benutzerdaten:", docs);

    const createdDocs = [];

    for (const doc of docs) {
      const createdDoc = await prisma.doctors.create({
        data: {
          firstname: doc.firstname,
          lastname: doc.lastname,
          email: doc.email,
        },
      });

      // ÖFFNUNGSZEITEN

      createdDocs.push(createdDoc);
    }

    // Erfolgreiche Antwort
    res.status(200).json({
      message: "Benutzer erfolgreich hinzugefügt.",
      createdDocs,
    });
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
});
