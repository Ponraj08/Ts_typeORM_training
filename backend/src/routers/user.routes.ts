import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authenticateJWT } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/authorize.middleware";

export const router = Router();

const userController = new UserController();

router.post("/", userController.createUser);

router.get("/", authenticateJWT, userController.getuser);


router.post("/login", userController.loginUser);


router.put("/update/:id",authenticateJWT,authorizeRoles,userController.updateuser);

router.delete("/delet/:id",authenticateJWT,authorizeRoles,userController.deleteUser);


//curd in react without auth,authroize

router.get('/getusers',userController.getuser)
router.delete("/deletusers/:id" ,userController.deleteUser);
router.put("/updateusers/:id",userController.updateuser);