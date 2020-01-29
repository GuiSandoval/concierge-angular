import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'app/interfaces/usuario';
import { Observable, throwError, of } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import * as jwtDecode from "jwt-decode";
// import { runInThisContext } from 'vm';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AccessToken: string = "";
  public testeStr;

  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
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



  loginForm(data): Observable<LoginResponse> {
    const url = `${environment.Api_url}/projeto/app/api.php`;
    return this.http.post<LoginResponse>(url, data, this.httpOptions)
      .pipe(
        tap(response => this.setUser(response))
      )
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  setUser(resp: LoginResponse) {

    localStorage.setItem('nome', resp.name);
    localStorage.setItem('access_token', resp.access_token);
    // this.router.navigate(['/inicio']);
  }
  //Verifica se o tempo do Token Expirou 
  isAuthenticated() {
    const token = jwtDecode(localStorage.getItem('access_token'));
    const exp = token['exp'];
    let result = false;
    let time = new Date();

    try {
      if (exp > time.getTime() / 1000) {
        //Token Ainda é válido!
        result = true;
      }
    } catch (err) {
      console.log(err);
      result = false;
    }
    return result;
  }
  decodedPayloadJWT(): any {
    try {
      return jwtDecode(localStorage.getItem('access_token'));
    } catch (Error) {
      return null;
    }
  }
}
