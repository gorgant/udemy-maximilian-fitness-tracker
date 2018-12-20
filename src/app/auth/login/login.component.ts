import { Component, OnInit } from '@angular/core';
import { loginValidationMessages } from 'src/app/models/validation-messages';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LOGIN_FORM_VALIDATION_MESSAGES = loginValidationMessages;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const userAuthData: AuthData = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.login(userAuthData);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

}
