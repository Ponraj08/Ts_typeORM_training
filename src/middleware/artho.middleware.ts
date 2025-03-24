import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

export const authorizeRoles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("enter",token)

  if (!token) {
    res.status(403).json({ error: "Access Denied: No Token Provided" });
    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    
    if (decode.role !== "Admin") {
      res.status(403).json({ error: "Access Denied: Insufficient Permissions" });}
      
      console.log(decode);
      next();
      return;
    
  }  catch (error) {
    res.status(401).json({ error: "Invalid Token" });
  }
};
