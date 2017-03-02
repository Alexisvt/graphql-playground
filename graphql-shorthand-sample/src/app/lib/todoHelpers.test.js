// @flow
import { addTodo, findById, toggleTodo, updateTodo } from './todoHelpers';
import { type ITodo } from '../App';

declare var test: typeof it;
declare var expect: (value: any) => JestExpectType;

test('addTodo should add the passed to the list', () => {
  const startTodos: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
  ];

  const newTodo: ITodo = { id: 3, name: 'three', isComplete: false };

  const expected: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  const result = addTodo(startTodos, newTodo);

  expect(result).toEqual(expected);
});

test('addTodo should not mutate the existing list', () => {
  const startTodos: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
  ];

  const newTodo: ITodo = { id: 3, name: 'three', isComplete: false };

  const expected: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];

  const result = addTodo(startTodos, newTodo);

  expect(result).not.toBe(expected);
});

test('findById should return the expected item from an array', () => {
  const startTodos: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];
  const expected: ITodo = { id: 2, name: 'two', isComplete: false };
  const result = findById(2, startTodos);

  expect(result).toEqual(expected);
});

test('toggleTodo should toggle the isComplete prop of a todo', () => {
  const startTodo: ITodo = { id: 2, name: 'two', isComplete: false };
  const expected: ITodo = { id: 2, name: 'two', isComplete: true };
  const result = toggleTodo(startTodo);
  expect(result).toEqual(expected);
});

test('toggleTodo should not mutate the original todo', () => {
  const startTodo: ITodo = { id: 2, name: 'two', isComplete: false };
  const expected: ITodo = { id: 2, name: 'two', isComplete: true };
  const result = toggleTodo(startTodo);
  expect(result).not.toBe(expected);
});

test('updateTodo should update an item by id', () => {
  const startTodos: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];
  const updatedTodo: ITodo = { id: 2, name: 'two', isComplete: true };
  const expectedTodos: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: true },
    { id: 3, name: 'three', isComplete: false }
  ];

  const result = updateTodo(startTodos, updatedTodo);

  expect(result).toEqual(expectedTodos);
});

test('updateTodo should not mutate the original array', () => {
  const startTodos: ITodo[] = [
    { id: 1, name: 'one', isComplete: false },
    { id: 2, name: 'two', isComplete: false },
    { id: 3, name: 'three', isComplete: false }
  ];
  const updatedTodo: ITodo = { id: 2, name: 'two', isComplete: true };

  const result = updateTodo(startTodos, updatedTodo);

  expect(result).not.toBe(startTodos);
});