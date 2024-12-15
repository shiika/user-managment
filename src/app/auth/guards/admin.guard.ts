import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth.service";

export const canCreateUser: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const isAdmin = authService.isAdmin()();

    if (!isAdmin) {
        toastr.warning("You are not admin", "Warning");
        router.navigateByUrl('/');
        return false;
    }

    return true
}