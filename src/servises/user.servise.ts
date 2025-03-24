
import { user } from "../entities/users";
import { AppDataSource } from "../ormconfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userRepository = AppDataSource.getRepository(user);


//create neu user

export const posting = async (
  name: string,
  email: string,
  password: string,
  role: string
) => {

  const hashedPassword = await bcrypt.hash(password, 10);

  const User = new user();
  User.name = name;
  User.email = email;
  User.password = hashedPassword;
  User.role = role;

  

  const newUser = userRepository.create(User);

  await userRepository.save(newUser);
  return;
};

//view all users

export const viewing = async () => {
  const users = await userRepository.find();
  return users;
};

//update users

export const updating = async (
  id: string,
  name: string,
  email: string,

  role: string
) => {
  const ID = parseInt(id);
  const currentUser = await userRepository.findOneBy({ id: ID });
  if (currentUser) {


    const newUserData = {
      ...currentUser,
      name: name || currentUser.name,
      email: email || currentUser.email,
 
      role: role || currentUser.role,
    };

    const updatedUser = await userRepository.update({ id: ID }, newUserData);
    return updatedUser;
  }
};

//delete users

export const deleting = async (id: string) => {
  const ID = parseInt(id);
  const currentUser = await userRepository.delete({ id: ID });
  return currentUser;
};

//login users

export const logining = async (name: string, password: string) => {
  const User = await userRepository.findOne({
    where: { name },
  });

  if (!User) {
    throw new Error("Authentication failed: User not found");
  }

  const passwordMatch = await bcrypt.compare(password, User.password);
  if (!passwordMatch) {
    throw new Error("Authentication failed: Incorrect password");
  }

  const token = jwt.sign({ userId: User.id ,role: User.role}, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });


  return { token };
};

