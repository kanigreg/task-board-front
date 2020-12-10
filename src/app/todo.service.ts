import { Injectable } from '@angular/core';

import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  // Warning: no backend and frontend synchronization.

  update(todo: Todo): void {
    console.log('update ' + todo.text)
  }

  create(todo): void {
    console.log('create ' + todo.text)
  }
}
