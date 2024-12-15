import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  TOTAL_COUNT = 50;
  currentPage: number = 0;
  pageSize: number = 10;
  pageNumbers: number[] = Array.from({length: this.TOTAL_COUNT / this.pageSize}, (_, i) => i + 1);
  usersService = inject(UserService);
  authService = inject(AuthService);
  isAdmin: Signal<boolean> = this.authService.isAdmin();


/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Loads the users for the current page on component initialization.
   * Additionally, requests a single user with the id of 1, but does not
   * store the response anywhere.
   */
/******  2f05cdf6-3bec-4e5b-862e-a2dbd2411bf3  *******/  ngOnInit(): void {
    this.loadUsers(this.currentPage);
    this.usersService.getUser("1").subscribe();
  }

  public loadUsers(pageNo: number) {
    this.usersService.getUsers({ pageNo: pageNo, pageSize: this.pageSize })
      .pipe(
        take(1),
      )
      .subscribe((result: User[]) => {
        this.users = result;
      })
  }

}
