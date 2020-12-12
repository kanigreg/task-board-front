import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";

import { Project } from '../models/project'
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  // move to api file?
  private urls = {
    getAll: () => 'api/projects'
  }

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.urls.getAll())
      .pipe(
        map(res => plainToClass(Project, res)),
        catchError(this.handleError<Project[]>('get projects'))
      )
  }

  private handleError<T>(_ = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)

      return of(result as T);
    }
  }
}
