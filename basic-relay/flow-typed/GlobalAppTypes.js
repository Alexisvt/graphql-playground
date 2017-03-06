// @flow
/* eslint no-undef: off */


declare interface ITodo {
  id: string;
  name: string;
  isComplete: boolean;
  createdAt: string;
}

declare interface IAppState {
  todos: ITodo[];
  currentTodo: string;
  errorMessage?: string;
}

declare interface ITodoItem {
  todo: ITodo;
  handleToggle?: (id: string) => void;
}

declare interface ITodoFormProps {
  currentTodo: string;
  handleInputChange(e: Event): void;
  handleSubmit(e: Event):void;
}

declare interface IDBAccessLayer {
  getTodosByIds(todosIds: any[]): Promise<any>;
  getTodos(limit?: number): Promise<any>;
  getTodosRelay(query?: string): Promise<any>;
  createTodo(todoItem: Object): Promise<any>;
  createTodoRelay(todoItem: Object): Promise<any>;
  updateTodo(todoItem: Object): Promise<any>;
  toggleTodo(taskId: string, isComplete: boolean): Promise<any>;
  deleteTodo(taskId: string): Promise<any>;
}

declare interface IContextObj {
  mdb: IDBAccessLayer
}