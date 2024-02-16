import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";


dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

// app.post("/add/doc", async (req: Request, res: Response) => {
//     const doctor = prisma.user.create({
//         data: {
//             name: "Dr. Strange",
//             email: "drstrange@gmail.com",
//             password: "123456",
//             adress: "New York",
//         }
//     });

//     res.send({
//       'status': 200,
//       'user': doctor
//     });
// });

app.post('/add/docs', async (req, res) => {
  try {
    if (!req.body || !req.body.docs || !Array.isArray(req.body.docs)) {
      return res.status(400).json({ error: 'Ungültiges JSON-Format.'});
    }

    const docs = req.body.docs;
    console.log('Empfangene Benutzerdaten:', docs);

    const createdDocs = [];

    for (const doc of docs) {
      const createdDoc = await prisma.doctors.create({
        data: {
          firstname: doc.firstname,
          lastname: doc.lastname,
          email: doc.email
        }
      });

      // ÖFFNUNGSZEITEN
      

      createdDocs.push(createdDoc);
    }

    // Erfolgreiche Antwort
    res.status(200).json({ 
      message: 'Benutzer erfolgreich hinzugefügt.', 
      createdDocs });
  } catch (error) {
    console.error('Fehler beim Verarbeiten der Anfrage:', error);
    res.status(500).json({ error: 'Interner Serverfehler.' });
  }
});


app.get("/get/users", async(req: Request, res:Response) => {
  const users = await prisma.users.findMany();

  res.send({
    'status': 200,
    'docs': users
  });
});

app.get("/get/docs", async(req: Request, res:Response) => {
  const docs = await prisma.doctors.findMany();

  res.send({
    'status': 200,
    'docs': docs
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
