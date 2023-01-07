import express from "express";
import axios from "axios";
import { statusCodeController } from "../controllers/statusCodeController";

export const statusCodeRouter = express.Router();


statusCodeRouter.get('/:code', statusCodeController);