import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [FormsModule, NgIf]
})
export class AuthComponent {
  isLogin: boolean = true;
  isLoading: boolean = false;
  toastr = inject(ToastrService)
  authService = inject(AuthService);
  router = inject(Router);

  onSubmit(form: NgForm) {
    const { email, password } = form.value;
    this.isLoading = true;
    let $authRequest: Observable<{}> = this.authService.signIn(email, password);

    $authRequest
    .pipe(
      take(1)
    )
    .subscribe(
      res => {
        this.isLoading = false;
        this.toastr.success("Login successful", "Success");
        this.router.navigate(["/users/list"]);
      }
    )
  }

}
