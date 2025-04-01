import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
     res.status(403).json({ error: "Access Denied: No Token Provided" });
    return


  }

  try {
    
    const decode= jwt.verify(token, process.env.JWT_SECRET!) ;
    // console.log(decode)
    next();
    return
  } 
  catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
  
};
