import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { InputValidatorDirective } from 'src/app/shared/directives/input-validator.directive';
import { phoneValidatorNumber } from 'src/app/shared/utils/validators/phone.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputValidatorDirective],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  toastr = inject(ToastrService);
  userService = inject(UserService);
  fb = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  userId = this.route.snapshot.paramMap.get("id");

  userForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, phoneValidatorNumber]],
  })

  ngOnInit(): void {
    this.userService.getUser(this.userId)
      .pipe(
        take(1)
      )
      .subscribe(
        user => {
          this.userForm.patchValue({
            name: user.name,
            email: user.email,
            phone: user.phone
          })
        }
      )
  }

  onSubmit() {
    const body = this.userForm.value;
    this.userService.createUser(body)
      .pipe(
        take(1)
      )
      .subscribe(
        async res => {
          if (res) {
            this.toastr.success("User updated successfully", "Success");
            await this.router.navigate(["/users/list"])
          }
        }
      )
  }
}
