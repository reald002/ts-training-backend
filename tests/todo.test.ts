import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Todos from '../models/Todo';

const request = supertest(app);

const MOCK_DATA =
  [
    { text: 'Do this' },
    { text: 'Do that' },
    { text: 'Do something else' }
  ];

const IDs: string[] = [];

beforeAll(async () => {
  const testUrl = process.env.MONGO_TEST_DB_URI;
  await mongoose.connect(testUrl, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true });
  const inserted = await Todos.insertMany([...MOCK_DATA]);
  inserted.forEach(todo => {
    IDs.push(todo._id);
  });
});

afterAll(async () => {
  await Todos.deleteMany();
  await mongoose.disconnect();
});

describe('Get Endpoints', () => {
  it('should get all todos', async () => {
    const { body: todos } = await request.get('/todos');

    todos.map((todo: any, index: number) => {
      expect(todo.text).toEqual(MOCK_DATA[index].text);
      expect(todo.isChecked).toEqual(false);
    });
  });
});

describe('Post Endpoints', () => {
  it('should post 1 todo', async () => {
    const { body: postedTodo } = await request.post('/todos').send({
      text: 'posted todo text'
    });

    const { text, isChecked } = postedTodo;

    expect(text).toEqual('posted todo text');
    expect(isChecked).toEqual(false);
  });
});

describe('Patch Endpoints', () => {
  it('should patch 1 todo', async () => {
    const { body: patchedTodo } = await request.patch(`/todos/${IDs[0]}`).send({
      text: '"Do this" is completed now',
      isChecked: true
    });

    const { text, isChecked } = patchedTodo;

    expect(text).toEqual('"Do this" is completed now');
    expect(isChecked).toEqual(true);
  });

  it('should patch 1 todo', async () => {
    const { body: patchedTodo } = await request.patch(`/todos/${IDs[1]}`).send({
      text: '"Do that" text changed'
    });

    const { text, isChecked } = patchedTodo;

    expect(text).toEqual('"Do that" text changed');
    expect(isChecked).toEqual(false);
  });
});

describe('Delete Endpoints', () => {
  it('should delete 1 todo', async () => {
    const { body: todosBefore } = await request.get('/todos');

    const { body: deletedTodo } = await request.delete(`/todos/${IDs[2]}`);
    const { text } = deletedTodo;

    const { body: todosNow } = await request.get('/todos');

    expect(text).toEqual('Do something else');
    expect(todosNow.length).toEqual(todosBefore.length - 1);
  });
});
