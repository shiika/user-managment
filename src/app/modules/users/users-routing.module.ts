import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { canCreateUser } from "src/app/auth/guards/admin.guard";
import { CreateUserComponent } from "./components/create-user/create-user.component";
import { UpdateUserComponent } from "./components/update-user/update-user.component";
import { UsersListComponent } from "./components/users-list/users-list.component";

const routes: Routes = [
    { path: "list", loadComponent: () => UsersListComponent },
    { path: "create", loadComponent: () => CreateUserComponent, canActivate: [canCreateUser] },
    { path: "edit/:id", loadComponent: () => UpdateUserComponent, canActivate: [canCreateUser] },
    { path: "**", redirectTo: "list" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}