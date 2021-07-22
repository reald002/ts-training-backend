const express = require('express');
require('dotenv').config();
const todosRouter = require('./routes/todosRouter.js');

const app = express();

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  next();
});
app.use(todosRouter);

module.exports = app;
