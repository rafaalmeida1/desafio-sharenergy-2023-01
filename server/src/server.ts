import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { authRouter } from './routes/authRoute';
import { usersListRouter } from './routes/usersListRoute';

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

app.get('/', (req,res) => {
  res.send('hello world')
})

//routes

app.use('/api/auth/', authRouter)
app.use('/api/users-list/', usersListRouter)

//listen

app.listen(5001, () => console.log(`App listening on post: http://localhost:${5001}`));