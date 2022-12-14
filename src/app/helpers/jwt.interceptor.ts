import { AuthService } from 'app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private AuthService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        // const currentUser = this.AuthService.currentUserValue;
        // const isLoggedIn = currentUser && currentUser.token;
        // const isApiUrl = request.url.startsWith(config.apiUrl);

        if (this.AuthService.isLoggedIn()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            });
        }

        return next.handle(request);
    }
}