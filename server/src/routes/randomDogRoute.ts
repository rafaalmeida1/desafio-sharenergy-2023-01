import express from 'express';
import axios from 'axios';

export const randomDogRouter = express.Router();

randomDogRouter.get('/getDog', async (req,res) => {
    try {
        const response = await axios.get("https://random.dog/woof.json")
        res.status(200).json(response.data);
    }catch(err) {
        res.status(404).send(err);
    }
});