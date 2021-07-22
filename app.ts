import express from 'express';
import dotenv from 'dotenv';
import todosRouter from './routes/todosRouter';

dotenv.config();

const app = express();

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  next();
});

app.use(todosRouter);

export default app;
