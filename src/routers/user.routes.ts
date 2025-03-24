import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateJWT } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/artho.middleware";


export const router =Router();

 const userController = new UserController();


router.post("/",userController.createUser)



router.post("/login",userController.loginUser)


router.get("/",authenticateJWT,userController.getuser);



router.put("/update/:id",authenticateJWT,authorizeRoles,userController.updateuser)

router.delete("/:id",authenticateJWT,authorizeRoles,userController.deleteUser)