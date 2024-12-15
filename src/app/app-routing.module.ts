import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateUsers } from './auth/guards/auth.guard';
import { HeaderComponent } from './header/header.component';


const routes: Routes = [
  { path: "", component: HeaderComponent},
  { 
    path: "users", 
    canActivate: [canActivateUsers],
    loadChildren: () => import("./modules/users/users.module").then(m => m.UsersModule) 
  },
  { path: "login", loadComponent: () => import("./auth/auth.component").then(c => c.AuthComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
