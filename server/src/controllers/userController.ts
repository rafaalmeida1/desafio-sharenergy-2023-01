import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel";

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, phone, address, cpf, id } = req.body;
    const user = await User.create({ name, email, phone, address, cpf, id });
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ user });
  } catch(err) {
    res.status(500).json({err});
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
}

export async function deleteUser(req: Request, res: Response) {
  let id = req.params.id

  if(!id) {
    id = req.body.id;
  }

  try {
    const user = await User.findByIdAndRemove(id);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ err });
  }
}
