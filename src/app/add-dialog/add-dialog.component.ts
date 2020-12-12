import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Todo } from 'src/models/todo';
import { Project } from 'src/models/project';

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

    this.close(this.addTodoForm.value);
  }

  close(result?: any): void {
    this.dialogRef.close(result);
  }

}
