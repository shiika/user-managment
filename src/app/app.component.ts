import { Component, inject, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'user-managment';
  router = inject(Router);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  isAuthed: Signal<boolean> = this.authService.isAuthed();
  isNavbarVisible: boolean = false;

  logout() {
    this.toastr.success("Logout successful", "Success");
    this.authService.logout();
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
