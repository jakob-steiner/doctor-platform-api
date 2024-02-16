import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/add", async (req: Request, res: Response) => {
    const doctor = await prisma.user.create({
        data: {
            name: "Dr. Strange",
            email: "drstrange@gmail.com",
            password: "123456",
            adress: "New York",
        }
    });

    res.send({
      'status': 200,
      'user': doctor
    });
});

app.get("/users", async(req: Request, res:Response) => {
  const users = await prisma.user.findMany();

  res.send({
    'status': 200,
    'users': users
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
