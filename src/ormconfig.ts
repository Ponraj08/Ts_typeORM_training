import { DataSource } from "typeorm";

import dotenv from "dotenv";
// import { user } from "./entities/users";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: true,
  entities: [`${process.cwd()}/src/entities/*.ts`],
  migrations: [`${process.cwd()}/src/migration/*.ts`],


});
