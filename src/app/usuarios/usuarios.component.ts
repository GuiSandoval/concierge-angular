import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AlertModalService } from './../components/alert-modal.service';
import { Usuarios } from './../interfaces/usuarios';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public usuarios : Usuarios[];
  token = localStorage.getItem('token');
  teste = 'teste';
  constructor(
    private usuarioService : UsuarioService,
    private not : AlertModalService,
    private location : Location,
    private router : Router
    ) { }

  ngOnInit() {
    this.teste;
    this.token;
    this.getListaUsuario();
  }
  getListaUsuario(){
    this.usuarioService.getListaUsuarios()
    .subscribe(
      (usuarios:  Usuarios[]) => {
        this.usuarios = usuarios;
      }
    )
  }
  deleteUser(id_cpf : string){
      return this.usuarioService.deleteUsuario(id_cpf)
        .subscribe(resp => {
          if(resp.status === 'success'){
            this.not.showNotification(resp.dados,3);
            // setTimeout(() => {
              this.router.navigate(['usuarios']);
            // }, 2000);
          }
        });
  }
  onEdit(id_cpf){
    this.router.navigate(['usuarios/editar/', id_cpf]);
  }

}


