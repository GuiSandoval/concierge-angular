import { Location } from '@angular/common';
import { AlertModalService } from './../../components/alert-modal.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { Usuarios } from 'app/interfaces/usuarios';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  public tipoUser;
  public idSede;
  public title;

  spresp: any;

  private alterUser : Usuarios = this.route.snapshot.data['usuario'];

  constructor(
    private fb: FormBuilder,
    private usuarioService : UsuarioService,
    private not :AlertModalService,
    private location : Location,
    private route : ActivatedRoute) { }

  ngOnInit() {
    // FormGroup para Cadastro
    if(this.alterUser.id_cpf === null){
      this.title = "CADASTRO DE NOVO USUÁRIO";
      this.form = this.fb.group({
        id_cpf:           [null, [Validators.required, Validators.minLength(11)], [this.verificaUsuario.bind(this)]],
        nome:             [null, [Validators.required]],
        usuario:          [null, [Validators.required, Validators.minLength(8), Validators.maxLength(40)],[this.verificaUsuarioUser.bind(this)]],
        email:            [null, [Validators.email]],
        telefone:         [null],
        id_tipo_usuario:  [null, Validators.required],
        id_sede:          [null, [Validators.required]],
        hashSenha:        [null, [Validators.required, Validators.minLength(11), Validators.maxLength(50)]],
      });
    }
    // FormGroup para Alterar
    else{
      this.title = "ALTERAR " + this.alterUser.nome.toUpperCase();

      this.form = this.fb.group({
        id_cpf:           [{value:this.alterUser.id_cpf,disabled:true}, [Validators.required, Validators.minLength(11)]],
        nome:             [this.alterUser.nome, [Validators.required]],
        usuario:          [this.alterUser.usuario, [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
        email:            [this.alterUser.email, [Validators.email]],
        telefone:         [this.alterUser.telefone],
        id_tipo_usuario:  [this.alterUser.id_tipo_usuario, Validators.required],
        id_sede:          [this.alterUser.id_sede, [Validators.required]],
        hashSenha:        [null, [Validators.required, Validators.minLength(11), Validators.maxLength(50)]],
      });
    }
    this.getTipoUser();
    this.getSede();
  }

  onSubmit(){
    // console.log(this.form);
    if(this.form.valid){
      if(this.alterUser.id_cpf){
        //Alterar
        this.alterUsuario();
      }else{
        //Cadastro
        this.addUsuario();
      }
    }
  }
  // Retorno de Mensagens para errors 
  getErrorMessage(field : string) {
    return this.form.get(field).hasError('required') ? 'Este campo é obrigatório' :
      this.form.get(field).hasError('email') ? 'O email não é válido' : 
      this.form.get(field).hasError('maxlength') ? 'O campo não pode ter mais que ' + this.form.get(field).errors.maxlength.requiredLength+ ' caracteres.'  : 
      this.form.get(field).hasError('minlength') ? 'O campo deve ter ' + this.form.get(field).errors.minlength.requiredLength +' caracteres.' : 
      this.form.get(field).hasError('cpfInvalido') && this.form.get(field).dirty ? 'O CPF já existe':
      this.form.get(field).hasError('userInvalido') ? 'Nome de usuário já existe '
      :'';
  }
  // Função para pegar Errors
  hasError(field:string){
    return this.form.get(field).errors;
  }
  // VERIFICAR SE USUÁRIO JÁ EXISTE NO BANCO
  verificaUsuario(formControl: FormControl){
    return this.usuarioService.verificaUsuario(formControl.value)
    .pipe(
      map(cpfExiste => cpfExiste ? {cpfInvalido : true} : null)
    );
  }
  // VERIFICA SE USERNAME JÁ EXISTE NO BANCO
  verificaUsuarioUser(formControl: FormControl){
    return this.usuarioService.verificaUsuarioUser(formControl.value)
    .pipe(
      // map(userExiste => console.log(userExiste) )
      map(userExiste => userExiste ? {userInvalido : true} : null)
    );
  }
  // PEGA OS TIPO DE USUARIOS DO BANCO
  getTipoUser(){
    return this.usuarioService.getListaTipoUser()
      .subscribe(resp => {
          this.tipoUser= resp;
      });
  }
  // PEGA OS TIPOS DE SEDE DO BANCO
  getSede(){
    return this.usuarioService.getListaSede()
      .subscribe(resp => {
        this.idSede = resp;
      })
  }
  // ADICIONA USUARIO
  addUsuario(){
    this.usuarioService.addUsuario(this.form.value)
    .subscribe(resp => {
      if(resp.status === 'success'){
        this.not.showNotification(resp.dados,2);
        this.location.back();
      }else{
        this.not.showNotification(resp.dados,4);
      }
    });
  }
  // ALTERA USUARIO
  alterUsuario(){
    var formUser = this.form.value;
    formUser.id_cpf = this.alterUser.id_cpf;
    this.usuarioService.alterUsuario(formUser)
    .subscribe(
      resp => {
        if(resp.status === 'success'){
          this.not.showNotification(resp.dados,2);
          this.location.back();
        }else{
          // console.log(resp);
          this.not.showNotification(resp.dados,4);
      }
    })
  }
}