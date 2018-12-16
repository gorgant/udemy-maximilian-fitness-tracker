export const signUpValidationMessages = {
  'email': [
    { type: 'required', message: 'Email is required.'},
    { type: 'email', message: 'Not a valid email.'},
  ],
  'password': [
    { type: 'required', message: 'Password is required.' },
    { type: 'minlength', message: 'Must be at least 6 characters' },
  ],
  'birthdate': [
    { type: 'required', message: 'You must be 18 years or older.' },
  ],
  'acceptTerms': [
    { type: 'required', message: 'You must accept our terms and conditions to proceed.' },
  ],
};

export const loginValidationMessages = {
  'email': [
    { type: 'required', message: 'Email is required.'},
    { type: 'email', message: 'Not a valid email.'},
  ],
  'password': [
    { type: 'required', message: 'Password is required.' },
  ]
};
