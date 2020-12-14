import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { Observable, of } from 'rxjs';
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
    const body = classToPlain(todo);

    return this.http.patch<any>(url, body)
      .pipe(
        map(({ todo }) => plainToClass(Todo, todo)),
        catchError(this.handleError<any>('update todo'))
      );
  }

  create(todo: Todo): Observable<Todo> {
    const url = this.urls.create();
    const body = classToPlain(todo);

    return this.http.post<any>(url, body)
      .pipe(
        map(({ todo }) => plainToClass(Todo, todo)),
        catchError(this.handleError<any>('create todo'))
      );
  }

  private handleError<T>(_ = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T);
    }
  }
}
