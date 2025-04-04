import { DataSource } from "typeorm";

import dotenv from "dotenv";


dotenv.config();


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logging: true,
  entities: [`${process.cwd()}/src/database/entities/*.ts`],
  migrations: [`${process.cwd()}/src/database/migration/*.ts`],
});
