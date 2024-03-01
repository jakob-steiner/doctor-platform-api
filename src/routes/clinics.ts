import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const clinics = await prisma.clinics.findMany();
    res.send({
      status: 200,
      clinics: clinics,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Ärzte:", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    if (!req.body || !req.body.clinics || !Array.isArray(req.body.clinics)) {
      return res.status(400).json({ error: "Ungültiges JSON-Format." });
    }

    const clinics = req.body.clinics;

    const createdClinics = [];

    for (const clinic of clinics) {
      const createdDoc = await prisma.clinics.create({
        data: {
          address: clinic.address,
          city: clinic.city,
          zip: clinic.zip,
        },
      });

      // ÖFFNUNGSZEITEN

      createdClinics.push(createdDoc);
    }

    // Erfolgreiche Antwort
    res.status(200).json({
      message: "Benutzer erfolgreich hinzugefügt.",
      createdClinics,
    });
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error);
    res.status(500).json({ error: "Interner Serverfehler." });
  }
});

module.exports = router;
