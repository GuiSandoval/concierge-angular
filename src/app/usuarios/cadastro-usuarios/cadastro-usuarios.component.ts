import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      id_cpf: [null, [Validators.required, Validators.minLength(11)]],
      nome: [null, [Validators.required]],
      usuario: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      email: [null, [Validators.email]],
      telefone: [null],
      id_tipo_usuario: [null, Validators.required],
      id_sede: [null, [Validators.required]],
      hashSenha: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(50)]]
    })
  }

  onSubmit(){
    console.log(this.form);
    if(this.form.valid){
      console.log('submit');
    }
  }
  getErrorMessage(field : string) {
    return this.form.get(field).hasError('required') ? 'Este campo é obrigatório' :
      this.form.get(field).hasError('email') ? 'O email não é válido' : 
      this.form.get(field).hasError('maxlength') ? 'O campo não pode ter mais que ' + this.form.get(field).errors.maxlength.requiredLength+ ' caracteres.'  : 
      this.form.get(field).hasError('minlength') ? 'O campo deve ter ' + this.form.get(field).errors.minlength.requiredLength +' caracteres.' : 
      '';
  }
  hasError(field:string){
    return this.form.get(field).errors;
  }


}