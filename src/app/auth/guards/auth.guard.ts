import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../auth.service";

export const canActivateUsers: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const isLoggedIn = authService.isAuthed()();

    if (!isLoggedIn) {
        toastr.warning("Please login first", "Warning");
        router.navigateByUrl('/login');
        return false;
    }

    return true
}