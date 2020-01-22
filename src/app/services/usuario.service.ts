import { Usuarios } from './../interfaces/usuarios';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  getListaUsuarios(): Observable<Usuarios[]>{
    const url = `${environment.Api_url}/?pesquisaUsuario`;
    return this.http.get<Usuarios[]>(url);
  }
}
