import express from 'express';
import { getTodos,postTodo, deleteTodo, patchTodo } from '../controllers/TodoController';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();

const todosRouter = express.Router();

todosRouter.get('/todos', getTodos);
todosRouter.post('/todos/:id', jsonParser, postTodo);
todosRouter.delete('/todos/:id', deleteTodo);
todosRouter.patch('/todos/:id', jsonParser, patchTodo);

export default todosRouter;
