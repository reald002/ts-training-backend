const express = require('express');
const TodoController = require('../controllers/TodoController.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const todosRouter = express.Router();

todosRouter.get('/todos', TodoController.getTodos);
todosRouter.post('/todos', jsonParser, TodoController.postTodo);
todosRouter.delete('/todos/:id', TodoController.deleteTodo);
todosRouter.patch('/todos/:id', jsonParser, TodoController.patchTodo);

module.exports = todosRouter;
