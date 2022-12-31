import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { userRouter } from './routes/userRoutes';

dotenv.config();

const app = express();

//Connect to database

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connect to DB');
}).catch((err) => {
  console.log(err.message);
})

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//routes

app.use('/api/users/', userRouter)

//listen

app.listen(5001, () => console.log(`App listening on post: http://localhost:${5001}`));