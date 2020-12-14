import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { plainToClass } from 'class-transformer';

import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { Todo } from 'src/models/todo';
import { TodoService } from 'src/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todo: string;
  projects: Project[]

  constructor(
    public dialog: MatDialog, 
    private projectService: ProjectService,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects()
      .subscribe(projects => {
        this.projects = projects});
  }

  addTaskHandler(data: any) {
    const todo = plainToClass(Todo, data);
    todo.isCompleted = false;
    this.todoService.create(todo)
      .subscribe(newTodo => {
        const project = this.projects.find(project => project.id === newTodo.projectId);
        project.todos.push(newTodo);
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {projects: this.projects}
    });

    dialogRef.afterClosed().subscribe((data) => {
      if(data){
        this.addTaskHandler(data)
      }
    });
  }
}
