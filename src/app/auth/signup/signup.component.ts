import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { signUpValidationMessages } from 'src/app/models/validation-messages';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  SIGN_UP_FORM_VALIDATION_MESSAGES = signUpValidationMessages;

  signUpForm: FormGroup;

  maxDate: Date;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {

    // This sets the max date to 18 years from the present (i.e., user must be 18 yrs or older)
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthdate: ['', Validators.required],
      acceptTerms: ['', Validators.requiredTrue]
    });
  }

  onSubmit() {
    const userAuthData: AuthData = {
      email: this.email.value,
      password: this.password.value
    };

    this.authService.registerUser(userAuthData);
  }

  get email() { return this.signUpForm.get('email'); }
  get password() { return this.signUpForm.get('password'); }
  get birthdate() { return this.signUpForm.get('birthdate'); }
  get acceptTerms() { return this.signUpForm.get('acceptTerms'); }

}
