import express, { Response, NextFunction, Request } from "express";
import "reflect-metadata";
import { AppDataSource } from "./src/database/ormconfig";
import { router } from "./src/routers/user.routes";
import errormiddleware from "./src/middleware/errorhandling.middleware";

const cron = require("node-cron");

const app: express.Application = express();

app.use(express.json());

app.use("/user", router);

app.use(errormiddleware)



const port: number = 5002;

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

cron.schedule("*/1 * * * *", () => {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
      console.error("Error fetching jokes.");
    });
});
