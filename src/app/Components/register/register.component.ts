import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Validation from '../../Utils/Validation';
import { AuthenticationService } from '../../Services/authentication.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  submitted: boolean = false;
  errorMessage = '';
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      userName: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    {
      validators: [Validation.match('password', 'confirmPassword')],
    }
  );

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

  HandleRegister(): void {
    this.errorMessage = '';
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this._authenticationService.Register(this.registerForm.value).subscribe({
      next: (data) => {
        if (data.Success) {
          this._router.navigateByUrl('/login');
        } else {
          this.errorMessage = data.Message;
        }
      },
    });
  }
}
