import express from 'express';
import { loginController, registerController } from '../controllers/userController';

export const userRouter = express.Router();

userRouter.post('/login', loginController);

userRouter.post('/register', registerController);