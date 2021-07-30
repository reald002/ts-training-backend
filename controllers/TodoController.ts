import { Request, Response } from 'express';
import Todos from '../models/Todo';

export const getTodos = async (req: Request, res: Response) => {
  try {
    await Todos.find((err, docs) => {
      res.status(200).send(docs);
    });
  } catch (e) {
    res.status(404).send(e.reason);
  }
};

export const postTodo = async (req: Request, res: Response) => {
  const newData = req.body;
  const saveData = new Todos(newData);
  try {
    await Todos.create(saveData);
    res.status(200).send(saveData);
  } catch {
    res.status(400).send('Error');
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await Todos.findByIdAndDelete(id);
    res.status(200).send(data);
  } catch {
    res.status(404).send(`Todo item with id = ${id} not found`);
  }
};

export const patchTodo = async (req: Request, res: Response) => {
  const changedTodo = req.body;
  const { id } = req.params;
  try {
    await Todos.findByIdAndUpdate(id, changedTodo);
    const data = await Todos.findById(id);
    res.status(200).send(data);
  } catch {
    res.status(404).send(`Todo item with id = ${id} not found`);
  }
};
