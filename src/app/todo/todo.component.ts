import { Component, Input, OnInit } from '@angular/core';

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
    this.todoService.update(this.todo)
      .subscribe(_ => this.todo.isCompleted = checked);
  } 

}
