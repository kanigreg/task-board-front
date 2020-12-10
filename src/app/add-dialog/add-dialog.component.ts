import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TodoService } from '../todo.service';
import { Project } from '../project';

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

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>, 
    private fb: FormBuilder,
    private todoService: TodoService,
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
      ]]
    });
  }

  onSubmit(): void {
    const controls = this.addTodoForm.controls;

    if (this.addTodoForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    this.todoService.create(this.addTodoForm.value);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
