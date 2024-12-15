import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth/auth.service';
import { LangService } from './shared/services/lang.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'user-managment';
  router = inject(Router);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  langService = inject(LangService);
  translate = inject(TranslateService);
  isAuthed: Signal<boolean> = this.authService.isAuthed();
  isNavbarVisible: boolean = false;

  ngOnInit(): void {
    this.langService.initLocalization();
  }

  logout() {
    this.toastr.success("Logout successful", "Success");
    this.authService.logout();
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}
