import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController';

export const usersListRouter = express.Router();

usersListRouter.get('/getUsers', getAllUsers);
usersListRouter.get('/getUser/:id', getUserById);

usersListRouter.post('/createUser', express.urlencoded({extended:true}), createUser);

usersListRouter.put('/updateUser/:id', express.urlencoded({extended:true}), updateUser);

usersListRouter.post('/deleteUser', express.urlencoded({extended:true}), deleteUser);