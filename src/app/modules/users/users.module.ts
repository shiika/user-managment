import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    UsersListComponent,
    UsersRoutingModule
  ]
})
export class UsersModule { }
