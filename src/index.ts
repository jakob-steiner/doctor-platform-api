import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { getDoctors, addDoctors } from "./docs";
import { getUsers } from "./users";


dotenv.config();

const prisma = new PrismaClient();
const app: Express = express();
const port = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.get("/docs", getDoctors);
app.post('/docs', addDoctors);
app.get("/users", getUsers);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
