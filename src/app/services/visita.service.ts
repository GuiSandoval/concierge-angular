import { Lotacao } from './../interfaces/lotacao';
import { CadVisita } from './../interfaces/cad-visita';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Visitas } from 'app/interfaces/visitas';
import { take, delay } from 'rxjs/operators';
import { Servidores } from 'app/interfaces/serv';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {


  constructor(private http : HttpClient) { }
/***************************************************************
******************* LISTA DE VISITAS ***************************
**************************************************************** */
  getListaVisitas(): Observable<Visitas[]>{
    const url = `${environment.Api_url}/?pesquisaVisita`;
    return this.http.get<Visitas[]>(url);
  }
/***************************************************************
******************* PESQUISA DE VISITAS  ***************************
**************************************************************** */
getListaVisitasPesq(id_cpf : string ): Observable<Visitas[]>{
  const url = `${environment.Api_url}/?pesquisaVisita=${id_cpf}`;
  return this.http.get<Visitas[]>(url).pipe(take(1));
}
/***************************************************************
******************* LISTA DE LOCAL *****************************
**************************************************************** */
  getListaLocal(): Observable<Lotacao[]>{
    const url = `${environment.Api_url}/?pesquisaLocal`;
    return this.http.get<Lotacao[]>(url);
  }
/********************************************************************
******************* LISTA DE SERVIDORES *****************************
********************************************************************* */
  getListaServ(): Observable<Servidores[]>{
    const url = `${environment.Api_url}/?pesquisaServ`;
    return this.http.get<Servidores[]>(url);
  }
/*********************************************************************
******************* INFORMA????ES SERVIDOR *****************************
********************************************************************** */
  getServInfo(id_cpf): Observable<Servidores>{
    const url = `${environment.Api_url}/?pesquisaServ=${id_cpf}`;
    return this.http.get<Servidores>(url);
  }
/*******************************************************************
******************* ADICIONAR VISITA *******************************
******************************************************************** */
  addVisita(visita){
    const url= `${environment.Api_url}/?cadastroVisita`;
    return this.http.post(url,visita).pipe(take(1)) ;
  }
/*******************************************************************
******************* Relatorios**************************************
******************************************************************** */
  getRelVisita(tipo_rel) : Observable<relVisita>{
    const url= `${environment.Api_url}/?relatorio=${tipo_rel}`;
    return this.http.get<relVisita>(url)
  }
}

export interface relVisita {
  qtdRel: Array<any>;
  meses: Array<any>;
}