import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    if (this.authService.isLoggedIn() && this.authService.isAuthenticated()) {
      console.log('deu certo');
      // this.router.navigate(['/inicio']);
      return true;
    } else {
      this.authService.logout();
      console.log('deu ruim');
      this.router.navigate(['/login']);
      return false;

    }
  }
}
