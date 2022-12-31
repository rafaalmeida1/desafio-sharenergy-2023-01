import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from 'bcryptjs'

export const loginController = async(req: Request,res: Response) => {
  const selectedUser = await User.findOne({email: req.body.email});
  if(!selectedUser) return res.status(400).send('Email or password incorrect');

  const passwordMatch = bcrypt.compareSync(req.body.password, selectedUser.password);
  if(!passwordMatch) return res.status(400).send('Email or password incorrect');

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password, verified: true});
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
  const selectedUser = await User.findOne({email: req.body.email});
  if(selectedUser) return res.status(400).send('Email already exists');

  const user = new User({
    email: req.body.email,
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