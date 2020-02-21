import { UsuarioService } from './../services/usuario.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuarios } from 'app/interfaces/usuarios';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolverGuard implements  Resolve<Usuarios>{
  constructor(private usuarioService : UsuarioService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <Usuarios>{
    if(route.params && route.params['id_cpf']){
      return this.usuarioService.getUsuario(route.params['id_cpf']).pipe(
        map(dados => dados[0])
      );
    }else{
      return of({
        id_cpf:           null,
        nome:             null,
        usuario:          null,
        email:            null,
        telefone:         null,
        id_tipo_usuario:  null,
        desc_tipo_usuario:null,
        id_sede:          null,
        desc_sede:        null,
        hashSenha:        null,
        status:           null,
        dados:            null
      });
    }
  }
}
