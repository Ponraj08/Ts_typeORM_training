import express, { Response, NextFunction, Request } from "express";
import "reflect-metadata";
import { AppDataSource } from "./database/ormconfig"
import { router } from "./routers/user.routes"
import errormiddleware from "./middleware/errorhandling.middleware"
import cors from "cors"
import path = require("path");
const cron = require("node-cron");

const app: express.Application = express();

app.use(cors());

app.use(express.json());

app.use("/user", router);

app.use(errormiddleware);


app.use(express.static(path.join(__dirname,"../../frontend")))


const port: number = 5002;

app.listen(port, async () => {
  try {
   console.log(
    path.join(__dirname,"../../frontend"));
    await AppDataSource.initialize();
    console.log("connected to mysql");

    console.log(`TypeScript with Express 
             http://localhost:${port}/`);
  } catch (error) {
    console.log("database error", error);
  }
});

// cron.schedule("*/1 * * * *", () => {
//   fetch("https://official-joke-api.appspot.com/random_joke")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//     .catch((error) => {
//       console.log(error);
//       console.error("Error fetching jokes.");
//     });
// });
