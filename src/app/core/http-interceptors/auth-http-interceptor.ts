import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const accessToken = this.authService.getAccessToken();
        const authReq = req.clone({
            headers: accessToken ? req.headers.set('Authorization', accessToken) : req.headers
        });
        return next.handle(authReq)
            .pipe(tap({
                next(value) {
                    return value;
                },
                error: (error: any) => {
                    if (error instanceof HttpErrorResponse) {
                        console.error(error);
                        if (error.status === 401 && error.url && error.url.indexOf('api/v1/accounts/checkSession') === -1) {
                            this.authService.refreshToken().subscribe({
                                next: (token) => {
                                    console.log('token refreshed.');
                                },
                                error: (err) => {
                                    this.router.navigate(['/account/sign-in'], { queryParams: { returnUrl: this.route.snapshot.url } });
                                },
                            });
                        }
                    }
                }
            }));
    }
}