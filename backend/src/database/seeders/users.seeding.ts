import { user } from "src/database/entities/users";
import { AppDataSource } from "src/database/ormconfig";
import bcrypt from "bcryptjs";

const users = [
  {
    id: 1,
    name: "ponraj",
    email: "raj@08112003",
    password: bcrypt.hashSync("raj@1234", 10),
    role: "Admin",
  },

  {
    id: 2,
    name: "vishnu",
    email: "vis@gmail.com",
    password: bcrypt.hashSync("vis@1234", 10),
    role: "user",
  },
];

async function RunSeed() {
  console.log("Script Started");
  await AppDataSource.initialize();

  console.log("Db initialized");

  if (AppDataSource.isInitialized) {
    const userRepository = AppDataSource.getRepository(user);

    for (const data of users) {
      const alreadyExist = await userRepository.findOne({
        where: {
          name: data.name,
        },
      });

      console.log(data);

      if (alreadyExist) {
        console.log(`User ${data.name} already exist`);
        continue;
      }
      await userRepository.save(data);
    }
  }

  console.log("Script End");
}

RunSeed();
