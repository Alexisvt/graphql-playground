import { type ITodo } from '../App';

export const addTodo = (list: ITodo[], ...newTodo: ITodo[]) => [...list, ...newTodo];

export const generatedId = () => Math.floor(Math.random() * 100000);

export const findById = (id: number, list: ITodo[]) => list.find(item => item.id === id);

export const toggleTodo = (item: ITodo) => ({ ...item, isComplete: !item.isComplete });

export const updateTodo = (list: ITodo[], updated: ITodo) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id);

  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ];
};