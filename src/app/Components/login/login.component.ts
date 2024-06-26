import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../Services/authentication.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,TranslocoModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  submitted: boolean = false;
  errorMessage = '';
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  HandleLogin(): void {
    this.errorMessage = '';
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this._authenticationService.Login(this.loginForm.value).subscribe({
      next: (data) => {
        if (data.Success) {
          this._authenticationService.SetAccessToken(data.Data);
          this._router.navigateByUrl('/student');
        } else {
          this.errorMessage = data.Message;
        }
      },
    });
  }
}
