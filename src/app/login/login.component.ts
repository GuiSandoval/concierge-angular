import { AlertModalService } from './../components/alert-modal.service';
import { LoginResponse } from './../interfaces/usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as $ from 'jquery';
import 'bootstrap-notify';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public tokenParam :LoginResponse;

  model: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private not : AlertModalService
  ) { }

  ngOnInit() {
    // this.authService.logout();
  }

  login() {

    if (!this.model.username) {
      let msg = 'O campo de Login é Obrigatório!'
      this.not.showNotification( msg, 4);
    } else if (!this.model.password) {
      let msg = 'O campo de Senha é Obrigatório!'
      this.not.showNotification( msg, 4);
    } else {


      this.model.action = 'login';
      // console.log(this.model);

      this.authService.loginForm(this.model).subscribe(response => {
        if (response.status === 'success') {
          this.tokenParam = response;
          this.authService.AccessToken = this.tokenParam.access_token;



          // this.authService.setUser(response);
          
          this.not.showNotification( response.message, 2);
          this.router.navigate(['/inicio']);

        } else if (response.status === 'invalid') {
          this.not.showNotification( response.message, 4);
          // console.log(response.message);
        }
      }, error => {
        this.not.showNotification(error, 4);
        console.error(error);
      });
    }
  }
}
