import express from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/ormconfig";
import { router } from "./src/routers/user.routes";
import { Request, Response } from "express";

const app: express.Application = express();

app.use(express.json());

app.use("/user", router);

app.get("/check", (req: any, res: any) => {
  console.log("checking");
  return res.status(200).json({ message: " Express Works" });
});

const port: number = 4000;

app.listen(port, async () => {
  try {
    await AppDataSource.initialize();
    console.log("connected to mysql");

    console.log(`TypeScript with Express 
             http://localhost:${port}/`);
  } catch (error) {
    console.log("database error", error);
  }
});

// // Handling '/' Request
// app.get('/', (_req, _res) => {
//     _res.send("TypeScript With Express");
// });
