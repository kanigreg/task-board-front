import { Component, Input, OnInit } from '@angular/core';
import { classToClass } from 'class-transformer';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @Input() todo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
  }

  changeHandler({ checked }): void {
    const updatedTodo = classToClass(this.todo)
    updatedTodo.isCompleted = checked;
    this.todoService.update(updatedTodo)
      .subscribe(
        (todo) => this.todo.isCompleted = todo.isCompleted,
      );
  } 

}
