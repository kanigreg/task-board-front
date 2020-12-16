import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo';
import { Project } from 'src/models/project';
import { plainToClass } from 'class-transformer';
import { HelperService } from 'src/services/helper.service';

export interface DialogData {
  projects: Project[]
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  addTodoForm: FormGroup;
  NEW_CATEGORY = false;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent, Todo>, 
    public helperService: HelperService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.addTodoForm = this.fb.group({
      text: ['', [
        Validators.required
      ]],
      projectTitle: [null, [
        Validators.required
      ]],
      newProjectTitle: [null]
    });
  }

  onSubmit(): void {
    const controls = this.addTodoForm.controls;

    if (this.addTodoForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }
    
    if (controls.projectTitle.value === this.NEW_CATEGORY) {
      controls.projectTitle.setValue(controls.newProjectTitle.value);
    }

    const todo = plainToClass(Todo, this.addTodoForm.value);
    todo.isCompleted = false;
    this.close(todo);
  }

  close(result?: Todo): void {
    this.dialogRef.close(result);
  }

}
