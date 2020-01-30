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

    this.authService.isAuthenticated2();
    
    if (this.authService.isLoggedIn()) {
      // if (this.authService.isLoggedIn() && this.authService.isAuthenticated()) {
        return true;
    } else {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;

    }
  }
}
