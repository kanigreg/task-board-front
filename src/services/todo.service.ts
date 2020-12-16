import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Todo } from "../models/todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private urls = {
    update: (projectId, todoId) => `api/projects/${projectId}/todos/${todoId}`,
    create: () => `api/todos`
  }

  constructor(private http: HttpClient) { }

  update(todo: Todo): Observable<Todo> {
    const url = this.urls.update(todo.projectId, todo.id);
    const body = classToPlain(todo, { excludeExtraneousValues: true });

    return this.http.patch<Todo>(url, body)
      .pipe(
        map((todo) => plainToClass(Todo, todo)),
        catchError(this.handleError('update todo'))
      );
  }

  create(todo: Todo): Observable<Todo> {
    const url = this.urls.create();
    const body = classToPlain(todo, { excludeExtraneousValues: true });

    return this.http.post<Todo>(url, body)
      .pipe(
        map((todo) => plainToClass(Todo, todo)),
        catchError(this.handleError('create todo'))
      );
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<Todo> => {
      error.operation = operation;
      console.error(error)

      return throwError(operation + ' failed');
    }
  }
}
