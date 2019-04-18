import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


export interface Todo {
  id: number,
  task: string,
  status: string,
  createdAt: Date
}

const ITEMS_KEY = 'my-todos';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // CREATE
  addTodo(todo: Todo): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((todos: Todo[]) => {
      if (todos) {
        todos.push(todo);
        return this.storage.set(ITEMS_KEY, todos);
      } else {
        return this.storage.set(ITEMS_KEY, [todo]);
      }
    });
  }

  // READ
  getTodos(): Promise<Todo[]> {
    return this.storage.get(ITEMS_KEY);
  }

  // UPDATE
  updateTodo(todo: Todo): Promise<any> {
    return this.storage.get(ITEMS_KEY).then((todos: Todo[]) => {
      if (!todos || todos.length === 0) {
        return null;
      }

      let newTodos: Todo[] = [];

      for (let i of todos) {
        if (i.id === todo.id) {
          newTodos.push(todo);
        } else {
          newTodos.push(i);
        }
      }

      return this.storage.set(ITEMS_KEY, newTodos);
    });
  }

  // DELETE
  deleteTodo(id: number): Promise<Todo> {
    return this.storage.get(ITEMS_KEY).then((todos: Todo[]) => {
      if (!todos || todos.length === 0) {
        return null;
      }

      let toKeep: Todo[] = [];

      for (let i of todos) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      return this.storage.set(ITEMS_KEY, toKeep);
    });
  }
}