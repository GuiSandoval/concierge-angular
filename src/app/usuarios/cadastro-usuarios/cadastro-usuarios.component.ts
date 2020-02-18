import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';


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

  tipoUser= [
    {id: "1",nome:"Usuário", desc: "Só realiza cadastro de visitas e Visitantes"},
    {id: "2",nome:"Gerente", },
    {id: "3",nome:"Administrador", }
  ];
  idSede= [
    {id: "1",nome:"SEDE"},
    {id: "2",nome:"SAAN"},
    {id: "3",nome:"NAI"}
  ];
  constructor(
    private fb: FormBuilder,
    private usuarioService : UsuarioService) { }

  ngOnInit() {
    this.form = this.fb.group({
      id_cpf:           [null, [Validators.required, Validators.minLength(11)], [this.verificaUsuario.bind(this)]],
      nome:             [null, [Validators.required]],
      usuario:          [null, [Validators.required, Validators.minLength(8), Validators.maxLength(40)],[this.verificaUsuarioUser.bind(this)]],
      email:            [null, [Validators.email]],
      telefone:         [null],
      id_tipo_usuario:  [null, Validators.required],
      id_sede:          [null, [Validators.required]],
      hashSenha:        [null, [Validators.required, Validators.minLength(11), Validators.maxLength(50)]],
    })
  }

  onSubmit(){
    console.log(this.form);
    if(this.form.valid){
      console.log('submit');
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
  verificaUsuarioUser(formControl: FormControl){
    return this.usuarioService.verificaUsuarioUser(formControl.value)
    .pipe(
      map(userExiste => userExiste ? {userInvalido : true} : null)
    );
  }
}