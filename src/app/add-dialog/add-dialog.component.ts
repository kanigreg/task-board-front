import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Todo } from 'src/models/todo';
import { Project } from 'src/models/project';
import { plainToClass } from 'class-transformer';

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
  NEW_CATEGORY = '__NEW_CATEGORY__'

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent, Todo>, 
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.addTodoForm = this.fb.group({
      text: ['', [
        Validators.required
      ]],
      projectId: [null, [
        Validators.required
      ]],
      projectTitle: ['']
    });
  }

  onSubmit(): void {
    const controls = this.addTodoForm.controls;

    if (this.addTodoForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }
    
    const todo = plainToClass(Todo, this.addTodoForm.value);
    todo.isCompleted = false;
    this.close(todo);
  }

  close(result?: Todo): void {
    this.dialogRef.close(result);
  }

}
