import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.isSignedIn().pipe(map(isSignedIn => {
        if (!isSignedIn) {
            router.navigate(['/account/sign-in'], { queryParams: { returnUrl: state.url } });
        }
        return isSignedIn;
    }));
}
