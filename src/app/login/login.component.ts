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
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  login() {
    if (!this.model.email) {
      let msg = 'O campo de Login é Obrigatório!'
      this.showNotification('top', 'right', msg, 4);
      console.log(msg);

    } else if (!this.model.password) {
      let msg = 'O campo de Senha é Obrigatório!'
      this.showNotification('top', 'right', msg, 4);
    } else {


      this.model.action = 'login';
      console.log(this.model.action);
      console.log(this.model);

      this.authService.loginForm(this.model).subscribe(response => {
        if (response.status === 'success') {
          this.tokenParam = response;
          this.authService.AccessToken = this.tokenParam.access_token;



          this.authService.setUser(response);
          console.log(response.message);
          this.showNotification('top', 'right', response.message, 2);
          this.router.navigate(['inicio']);
        } else if (response.status === 'invalid') {
          this.showNotification('top', 'right', response.message, 4);
          console.log(response.message);
        }
      }, error => {
        console.error(error);
      });
    }
  }

  showNotification(from, align, text, typee) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $[`notify`]({
      icon: "notifications",
      message: text
      // message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      // type: type[2],
      type: type[typee],
      timer: 1000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">error_outline</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });


  }

}
