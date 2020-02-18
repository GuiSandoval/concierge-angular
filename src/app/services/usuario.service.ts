import { delay, map, tap } from 'rxjs/operators';
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
  getListaTipoUser(): Observable<any[]>{
    const url = `${environment.Api_url}/?pesquisaTipoUser`;
    return this.http.get<any[]>(url);
  }
  getListaSede(): Observable<any[]>{
    const url = `${environment.Api_url}/?pesquisaSede`;
    return this.http.get<any[]>(url);
  }
  verificaUsuario(usuario: string){
    const url = `${environment.Api_url}/?pesquisaUsuario=${usuario}`;
    return this.http.get<Usuarios>(url)
    .pipe(
      delay(2000),
      map((dados: any) => dados),
      tap(console.log),
      map((dados: Usuarios[]) => dados.filter( v =>v.id_cpf === usuario || v.usuario === usuario)),
      tap(console.log),

      map((dados : any[]) => dados.length > 0)
    );
  }
  verificaUsuarioUser(usuario: string){
    const url = `${environment.Api_url}/?pesquisaUsuario=${usuario}`;
    return this.http.get<Usuarios>(url)
    .pipe(
      delay(2000),
      map((dados: any) => dados),
      tap(console.log),
      map((dados: Usuarios[]) => dados.filter( v =>v.usuario === usuario)),
      tap(console.log),

      map((dados : any[]) => dados.length > 0)
    );
  }
}
