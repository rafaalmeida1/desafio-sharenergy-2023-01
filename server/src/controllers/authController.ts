import { Request, Response } from "express";
import { Auth } from "../models/authModel";
import bcrypt from 'bcryptjs'

export const loginController = async(req: Request,res: Response) => {
  const selectedUser = await Auth.findOne({userName: req.body.userName});
  if(!selectedUser) return res.status(400).send('Username or password incorrect');

  const passwordMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
  if(!passwordMatch) return res.status(400).send('Username or password incorrect');

  try {
    const { userName, password } = req.body;
    await Auth.findOne({ userName, password, verified: true});
    res.json({
      selectedUser,
      passwordMatch
    })
  }
  catch (err) {
    console.log(err);
  }
}

export const registerController = async(req: Request, res: Response) => {
  const selectedUser = await Auth.findOne({userName: req.body.userName});
  if(selectedUser) return res.status(400).send('Username already exists');

  const user = new Auth({
    userName: req.body.userName,
    password: bcrypt.hashSync(req.body.password),
    verified: true
  })

  try {
    const savedUser = await user.save();
    res.status(201).send(savedUser);
  }catch(err) {
    res.status(400).send(err);
  }
}