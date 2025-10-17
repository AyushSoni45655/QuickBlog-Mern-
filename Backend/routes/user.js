import  {signIn,signUp,adminLogin } from "../controllers/userController.js";
import express from "express";

const userRouter = express.Router();

userRouter.post("/signin",signIn);
userRouter.post("/signup",signUp);
userRouter.post("/admin",adminLogin);

export default userRouter;