import { VisitanteService } from 'app/services/visitante.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Visitantes } from 'app/interfaces/visitantes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VisitanteResolverGuard implements Resolve<Visitantes> {
  constructor(private visitanteService: VisitanteService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Visitantes> {

    if (route.params && route.params['id']) {
      return this.visitanteService.getVisitante(route.params['id']).pipe(
        map(dados => dados[0])
      );
    } else {
      return of({
        id_cpf: null,
        nome: null,
        matricula: null,
        telefone: null,
        ci: null,
        cargo: null,
        id_black_list: null,
        foto_visit: null,
        orgao_origem:null
      });
    }
  }
}
