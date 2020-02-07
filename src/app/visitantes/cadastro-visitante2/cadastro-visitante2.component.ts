import { Router } from '@angular/router';
import { AlertModalService } from './../../components/alert-modal.service';
import { VisitanteService } from 'app/services/visitante.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material';

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

  matcher = new MyErrorStateMatcher();
  // public mask = [ /[0-9]/, /[0-9]/, /[0-9]/,'.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/,'-',/[0-9]/,/[0-9]/]

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private visitanteService: VisitanteService,
    private notification: AlertModalService,
    private router: Router) { }

  ngOnInit() {

    // this.visitanteService.verificaVisitante('05039008180').subscribe();

    this.formulario = this.formBuilder.group({
      nome:         [null, Validators.required],
      id_cpf:       [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)], [this.verificaVisitante.bind(this)]],
      telefone:     [null],
      ci:           [null, Validators.required],
      matricula:    [null],
      cargo:        [null],
      foto_visit:   [null],
      orgao_origem: [null]
    });

  }
  onSubmit() {
    console.log(this.formulario);
    if (this.formulario.valid) {
      console.log(this.formulario.valid);
      this.visitanteService.addVisitante(this.formulario.value).subscribe(resp => {
        if (resp.status == 'error') {

          this.notification.showNotification(resp.dados, 4);

        } else if (resp.status == 'success') {

          this.notification.showNotification(resp.dados, 2);
          this.formulario.reset;
          // this.router.navigate(['/visitantes']);
        }
      });
      // this.formulario.reset();

    } else {
      this.verificaValidacoesForm(this.formulario);
    }

  }
  reset() {
    this.formulario.reset();
  }
  verificaValidTouched(campo) {
    return !this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }
  verificaLength(campo) {
    if (this.formulario.get('id_cpf').errors) {
      return (this.formulario.get(campo).errors.minlength || this.formulario.get(campo).errors.maxlength) && (this.formulario.get(campo).dirty);
    }
  }
  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
  verificaVisitante(formControl: FormControl) {
    console.log(this.formulario);
    console.log(this.formulario.controls.id_cpf.pending);

    return this.visitanteService.verificaVisitante(formControl.value)
      .pipe(
        map(cpfExiste => cpfExiste ? { cpfInvalido: true } : null));
  }
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
