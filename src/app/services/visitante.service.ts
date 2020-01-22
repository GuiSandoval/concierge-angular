import { map, take } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import { BlackList } from './../interfaces/black-list';
import { Servidores } from './../interfaces/serv';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Visitantes } from 'app/interfaces/visitantes';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VisitanteService {


  constructor(private http : HttpClient) { }

  //Lista de visitantes
  getListaVisitantes(): Observable<Visitantes[]>{
    const url = `${environment.Api_url}/?pesquisa`;
    return this.http.get<Visitantes[]>(url);
  }
  //Informações completas de um Visitante
  getVisitante(visitante) : Observable<Visitantes>{
    const url = `${environment.Api_url}/?pesquisa=${visitante}`;
    return this.http.get<Visitantes>(url);
  }
  //Adicionar Novo Visitante
  addVisitante(visitante): Observable<Visitantes>{
    const url = `${environment.Api_url}/?cadastro`;
    return this.http.post<Visitantes>(url, visitante);
  }

  //Adicionar à Black List 
  addBlacklist(id_cpf) : Observable<any>{
    const url = `${environment.Api_url}/?blacklist=${id_cpf}`;
    return this.http.get<any>(url);
  }
  //Remover Black List
  removeBlackList(id_cpf){
    const url = `${environment.Api_url}/?retiraBlackList=${id_cpf}`;
    return this.http.get<any>(url);
  }
  // addBlacklist(id_cpf){
  //   const url = `${environment.Api_url}/?blacklist=${id_cpf}`;
  //   return this.http.get(url)
  //   .map(res=> res.json());
  // }

  getBlackList() : Observable<BlackList[]> {
    const url = `${environment.Api_url}/?pesquisaBlackList`;
    return this.http.get<BlackList[]>(url);
  }

  addVisitante2(visitante){
    const url = `${environment.Api_url}/?cadastro`;
    return this.http.post(url,visitante).pipe(take(1));
  }



}
