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
        catchError(this.handleError('get projects', []))
      )
  }

  private handleError(operation = 'operation', result?: Project[]) {
    return (error: any): Observable<Project[]> => {
      error.operation = operation;
      console.error(error)

      return of(result);
    }
  }
}
