import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(
    private router: Router
  ) { }

  registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccess();
  }

  login(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };

    this.authSuccess();
  }

  logout() {
    this.user = null;

    // Emits the value like an event emitter whenever user logs out
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    // The spread operator ensures that the user can't be modified outside of this service
    return {...this.user};
  }

  isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    // Emits the value (like an event emitter) whenever user is authorized
    this.authChange.next(true);
    this.router.navigate(['training']);
  }
}
