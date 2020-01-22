import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'app/interfaces/usuario';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AccessToken: string = "";
  constructor(
    private http : HttpClient,
    private router : Router) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };


// Tratamento de erros da API 
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // return an observable with a user-facing error message
      return throwError(
        'Something bad happened; please try again later.');
    }



    loginForm(data): Observable<LoginResponse>{
      const url = 'http://localhost/visitantes-sejus/projeto/app/api.php';
      return this.http.post<LoginResponse>(url,data,this.httpOptions)
      // .map(res => res.);   
      // .pipe(
      //   retry(2),
      //   catchError(this.handleError)
      //   );
    }
    isLoggedIn(){
      return localStorage.getItem('access_token') != null;
    }
    logout(){
      localStorage.clear();
      this.router.navigate(['login']);
    }

    setUser(resp: LoginResponse){
      console.log(resp);
      localStorage.setItem('nome', resp.name);
      localStorage.setItem('access_token', resp.access_token);
      localStorage.setItem('Teste','teste');
      this.router.navigate(['/logado']);
    }
}
