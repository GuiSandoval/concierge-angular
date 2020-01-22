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
  constructor(private usuarioService : UsuarioService) { }

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

}


