import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { InputValidatorDirective } from 'src/app/shared/directives/input-validator.directive';
import { phoneValidatorNumber } from 'src/app/shared/utils/validators/phone.validator';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, InputValidatorDirective],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, phoneValidatorNumber]],
  })

  constructor(
    private toastr:ToastrService,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router) {
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
            this.toastr.success("User created successfully", "Success");
            await this.router.navigate(["/users/list"])
          }
        }
      )
  }
}
