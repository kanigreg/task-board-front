import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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

    return this.http.patch<Todo>(url, body)
      .pipe(
        catchError(this.handleError<Todo>('update todo'))
      );
  }

  create(todo: Todo): Observable<Todo> {
    const url = this.urls.create();
    const body = classToPlain(todo);
    
    return this.http.post<Todo>(url, body)
      .pipe(
        catchError(this.handleError<Todo>('update todo'))
      );
  }

  private handleError<T>(_ = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T);
    }
  }
}
