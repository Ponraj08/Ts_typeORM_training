import { Request, Response } from "express";
import { AppDataSource } from "../ormconfig";
import { user } from "../entities/users";
import { deleting, logining, posting, updating, viewing } from "../servises/user.servise";
import { authenticateJWT } from "../middleware/auth.middleware";



export class UserController {



  async createUser(req: Request, res: Response) {

      const { name, email, password,roleId } = req.body;

      const newUser = await posting(name, email, password, roleId);
      res.json(newUser); 
      return
    
  }

  


  async getuser(req: Request, res: Response) {

    const view = await viewing()
    res.json(view);
    return;
  };


  async updateuser(req: Request, res: Response) {

    const { name, email, password,role } = req.body;
    const{id}=req.params;

    const newUserData=await updating (id,name,email,role)
      res.json(newUserData); 
      return;

    };



    async deleteUser(req: Request, res: Response) {
      
      const deleted = await deleting(req.params.id);
      res.status(200).json("deleted successfully");
      return;

    
  };


  async loginUser(req: Request, res: Response) {
    try {
      const { name, password } = req.body;
      const loogi = await logining(name, password);
      res.status(200).json(loogi);
    } catch (error) {
      res.status(401).json({ error });
    }
  }

}
