import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserGuard implements CanActivate {
  private idTipoUsuario : number;

  constructor(
    private authService: AuthService,
    private router: Router){}
  canActivate() {
    this.idTipoUsuario = this.authService.getTipoUser();
    if (this.idTipoUsuario == 2 || this.idTipoUsuario == 3){
      return true;
    }else{
      this.router.navigate(['/inicio']);
      return false;
    }
    console.log(this.idTipoUsuario);
  }
  
}
