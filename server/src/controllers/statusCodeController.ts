import axios from "axios";
import { Request, Response } from "express";

export async function statusCodeController(req: Request, res: Response) {
  let statusCode = req.params.code || 400;
  try {
    const response = await axios.get(`https://http.cat/${statusCode}`, {
      responseType: "arraybuffer",
    });
    res.set("Content-Type", "image/jpeg");
    res.status(200).send(response.data);
  } catch (err) {
    res.status(err.response.status).send(err.response.data);
  }
}
