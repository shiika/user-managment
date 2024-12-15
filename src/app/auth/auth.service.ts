import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { UserService } from '../modules/users/services/user.service';

export interface ResPayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _isAdmin: WritableSignal<boolean> = signal(false);
  _isAuthed: WritableSignal<boolean> = signal(false);
  router = inject(Router);

  public isAdmin(): Signal<boolean> {
    return this._isAdmin;
  }

  public isAuthed(): Signal<boolean> {
    return this._isAuthed;
  }

  constructor(private http: HttpClient, private userService: UserService) {}

  signIn(email: string, password: string) {
    // This is just a mockup. In real-life, we should have an API call for login that will return a token and user details including role
    this._isAdmin.set(false);
    return this.userService.getUser(email === "Sincere@april.biz" ? "10" : "1")
      .pipe(
        tap((res) => {
          // We will assume that user with user id === 10 will be admin. In real-life, we should check for role/permission property
          if (res.id === 10) this._isAdmin.set(true);
          this._isAuthed.set(true);
        })
      );
  }

  logout() {
    this._isAdmin.set(false);
    this._isAuthed.set(false);
    this.router.navigateByUrl('/');
  }
}
