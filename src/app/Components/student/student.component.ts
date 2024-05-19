import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { StudentService } from '../../Services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  students: any;
  id: number = 0;
  addForm: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    nationalID: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
  });

  constructor(private _studentService: StudentService) {}

  ngOnInit(): void {
    this._studentService.GetAll().subscribe({
      next: (res: any) => {
        this.students = res.Data;
      },
    });
  }

  HandleAdd(){
    this._studentService.Add(this.addForm).subscribe({
      next:(res)=>{
      }
    })
  }
}
