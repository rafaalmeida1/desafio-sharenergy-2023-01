import express from 'express';
import { loginController, registerController } from '../controllers/userController';

export const authRouter = express.Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);