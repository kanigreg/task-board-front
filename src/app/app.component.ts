import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddDialogComponent } from "./add-dialog/add-dialog.component";
import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  todo: string;
  projects: Project[]

  constructor(public dialog: MatDialog, private projectService: ProjectService,) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.projects = this.projectService.getProjects();   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '250px',
      data: {projects: this.projects}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
