import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../Services/student.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  id: string | null = '';
  submitted: boolean = false;
  errorMessage: string = '';
  editForm: FormGroup = new FormGroup({
    nameArabic: new FormControl(null,[Validators.required]),
    nameEnglish: new FormControl(null,[Validators.required]),
    id: new FormControl(null),
    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    nationalID: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _studentService: StudentService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._studentService.GetById(this.id).subscribe({
      next: (res) => {
        let data: any = res.Data;
        this.editForm.patchValue({
          id: data.ID,
          firstName: data.Name.split(' ')[0],
          lastName: data.Name.split(' ')[1],
          mobile: data.Mobile,
          email: data.Email,
          nationalID: data.NationalID,
          age: data.Age,
        });
      },
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  EditFields() {
    this.errorMessage = '';
    this.submitted = true;

    if (this.editForm.invalid) {
      return;
    }

    if (this.editForm.value.id != this.id) {
      this.errorMessage = 'Invalid Id';
      return;
    }


    this._studentService.Edit(this.editForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigateByUrl('/student');
      },
    });
  }
}
