import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface Todo {
  text: string,
  project_id: number,
}

export interface Project {
  id: number,
  title: string
}

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  addTodoForm: FormGroup;
  projects: Project[] = [
    {title: 'Project', id: 0},
    {title: 'Home', id: 1}
  ]


  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.addTodoForm = this.fb.group({
      todo: ['', [
        Validators.required
      ]],
      project: [null, [
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

    console.log(this.addTodoForm.value);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }

}
