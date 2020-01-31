import { AlertModalService } from './../components/alert-modal.service';
import { AuthService } from 'app/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private AuthService: AuthService,
        private not : AlertModalService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.AuthService.logout();

                // location.reload(true);
            }
            this.not.showNotification('Sessão Expirada!',4);

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}