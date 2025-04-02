import { user } from "../database/entities/users";
import { AppDataSource } from "../database/ormconfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction } from "express";
// import { Iuser } from "../interfaceses";

dotenv.config();

const userRepository = AppDataSource.getRepository(user);

//create new user

export const posting = async (
  name: string,
  email: string,
  password: string,
  role: string,
  next:NextFunction
) => {
  
  if(!name || !email || !password || !role){
    
    return next({status:400,message:"all fields are required"})
  }
  
  const isexisting =await userRepository.findOne({where:{email}})
  
  if(isexisting){
    return next({status:409,message:"user already exists"})
  }
  
  const hashedPassword =  bcrypt.hashSync(password, 10);
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
  role: string,
  next: NextFunction
) => {
  const ID = parseInt(id);
  const currentUser = await userRepository.findOneBy({ id: ID });

  if (!currentUser) {
      const error: any = new Error("User not found");
      error.status = 404;
      return next(error); 
  }

  const newUserData = {
      ...currentUser,
      name: name || currentUser.name,
      email: email || currentUser.email,
      role: role || currentUser.role,
  };

  await userRepository.update({ id: ID }, newUserData);

  return newUserData;
};

//delete users

export const deleting = async (id: string) => {
  const ID = parseInt(id);
  const currentUser = await userRepository.delete({ id: ID });
  return currentUser;
};

//login users

export const logining = async (name: string, password: string,next:NextFunction) => {
  const User = await userRepository.findOne({
    where: { name },
  });

  if (!User) {
    
    return next({status:404,message:"user not found"})
  }

  const passwordMatch = await bcrypt.compare(password, User.password);
  console.log(password);
  
  if (!passwordMatch) {
    return next({status:401,message:"password wrong"})
  }

  const token = jwt.sign(
    { userId: User.id, role: User.role },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  return { token };
};
