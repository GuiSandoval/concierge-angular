import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalService } from './../../components/alert-modal.service';
import { VisitanteService } from 'app/services/visitante.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';
import { Visitantes } from 'app/interfaces/visitantes';
import { Location } from '@angular/common';


/** Exibir Errors dinamicamente  */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cadastro-visitante2',
  templateUrl: './cadastro-visitante2.component.html',
  styleUrls: ['./cadastro-visitante2.component.scss']
})

export class CadastroVisitante2Component implements OnInit {
  public imagePath;
  imgURL: any;
  public message: string;
  private visitante: Visitantes = this.route.snapshot.data['visitante'];


  matcher = new MyErrorStateMatcher();

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private visitanteService: VisitanteService,
    private notification: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    // FormGroup para Cadastro
    if (this.visitante.id_cpf === null) {
      this.formulario = this.formBuilder.group({
        nome:         [this.visitante.nome, Validators.required],
        id_cpf:       [this.visitante.id_cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)], [this.verificaVisitante.bind(this)]],
        telefone:     [this.visitante.telefone],
        ci:           [this.visitante.ci, Validators.required],
        matricula:    [this.visitante.matricula],
        cargo:        [this.visitante.cargo],
        foto_visit:   [this.visitante.foto_visit],
        orgao_origem: [this.visitante.orgao_origem]
      });
    }
    // FormGroup para Alterar
    else {
      this.formulario = this.formBuilder.group({
        nome:         [this.visitante.nome, Validators.required],
        id_cpf:       [{value: this.visitante.id_cpf, disabled: true }, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
        telefone:     [this.visitante.telefone],
        ci:           [this.visitante.ci, Validators.required],
        matricula:    [this.visitante.matricula],
        cargo:        [this.visitante.cargo],
        foto_visit:   [this.visitante.foto_visit],
        orgao_origem: [this.visitante.orgao_origem]
      });
    }
  }
  //FUNÇÃO DO BOTÃO DE SALVAR
  onSubmit() {
    if (this.formulario.valid) {
      if (this.visitante.id_cpf) {
        //ALTERAR
        this.visitanteService.updateVisitante(this.formulario.getRawValue()).subscribe(
          resp => {
            if (resp.status == 'error') {
              this.notification.showNotification(resp.dados, 4);
            } else if (resp.status === 'success') {
              this.notification.showNotification(resp.dados, 2);
              this.location.back();
            }
          });
      } else {
        //CADASTRO
        this.visitanteService.addVisitante(this.formulario.value).subscribe(resp => {
          if (resp.status == 'error') {
            this.notification.showNotification(resp.dados, 4);
          } else if (resp.status == 'success') {
            this.notification.showNotification(resp.dados, 2);
            this.location.back();
          }
        });
      }
    } else {
      this.verificaValidacoesForm(this.formulario);
    }

  }
  //FUNÇÃO DO BOTÃO DE RESETAR
  reset() {
    this.formulario.reset();
  }
  //VERIFICAR SE O CAMPO TEVE FOCO E SE É VÁLIDO
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }
  //VERIFICAR SE O TAMANHO DO CAMPO
  verificaLength(campo) {
    if (this.formulario.get('id_cpf').errors) {
      return (this.formulario.get(campo).errors.minlength || this.formulario.get(campo).errors.maxlength) && (this.formulario.get(campo).dirty);
    }
  }
  //VERIFICAR SE TODOS OS CAMPOS ESTÃO VÁLIDOS
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  //VERIFICAR SE CPF JÁ EXISTE NO BANCO
  verificaVisitante(formControl: FormControl) {
    return this.visitanteService.verificaVisitante(formControl.value)
      .pipe(
        map(cpfExiste => cpfExiste ? { cpfInvalido: true } : null));
  }
  //TESTE DE PREVIEW DE FOTOS
  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }
}
