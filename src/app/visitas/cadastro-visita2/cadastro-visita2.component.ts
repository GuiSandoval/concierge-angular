import { Location } from '@angular/common';
import { Response, Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { VisitaService } from './../../services/visita.service';
import { Lotacao } from './../../interfaces/lotacao';
import { Visitantes } from 'app/interfaces/visitantes';
import { VisitanteService } from 'app/services/visitante.service';
import { Servidores } from 'app/interfaces/serv';

@Component({
  selector: 'app-cadastro-visita2',
  templateUrl: './cadastro-visita2.component.html',
  styleUrls: ['./cadastro-visita2.component.scss'],
})
export class CadastroVisita2Component implements OnInit {
  public visitantes: Visitantes[];
  public servidores: Servidores[];
  public lotacoes: Lotacao[];
  public servidor: Servidores;
  myControl = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();
  form1: FormGroup;
  form2: FormGroup;
  formFinal: FormGroup;
  isLinear = false;
  submitted = false;

  constructor(
    private visitanteService: VisitanteService,
    private visitaService: VisitaService,
    private formBuilder: FormBuilder,
    private location: Location,
    private http: Http) { }

  ngOnInit() {
    this.form1 = this.formBuilder.group({
      id_cpf: ['', [Validators.required /*Validators.minLength(11),Validators.maxLength(11)]*/]],
      nomeTeste: ['']
    });
    this.form2 = this.formBuilder.group({
      secondCtrl: ['',],
      id_lotacao: [null, [Validators.required]]
    });

    this.formFinal = this.formBuilder.group({
      id_cpf: [''],
      id_lotacao_visita: [''],
      id_cpf_visitado: [''],
      nome_serv: [''],
      matricula_serv: [''],
      txt_observacoes: ['']
    });

    this.getListaVisitantes();
    this.getListaServidores();
    this.getListaLocal();
  }

  onSubmit() {
    // console.log(this.formFinal.value);
    if (this.formFinal.valid) {
      // console.log('submit');
      this.visitaService.addVisita(this.formFinal.value).subscribe(
        success => {
          console.log(success)
          this.location.back();

        },
        error => console.log(error),
        () => {
          console.log('Request Completo!');
        }
      );


    }
  }
  onCancel() {
    this.submitted = false;
    this.form1.reset();
    this.form2.reset();
  }
  onSave() {
    let id_cpf = this.form1.get('id_cpf').value;
    let id_cpf_visitado = this.form2.get('secondCtrl').value;
    let id_lotacao = this.form2.get('id_lotacao').value;

    this.formFinal.get('id_lotacao_visita').setValue(id_lotacao);

    if (id_cpf) {
      //Pegar dados do Visitante
      this.visitanteService.getVisitante(id_cpf)
        .subscribe(dados => this.setVisitante(dados));
    }
    if (id_cpf_visitado) {
      this.visitaService.getServInfo(id_cpf_visitado)
        //Pegar dados do Visitado
        .subscribe(dados => this.setVisitado(dados));
    }else{
      this.formFinal.get('nome_serv').setValue('');
      this.formFinal.get('id_cpf_visitado').setValue('');
      this.formFinal.get('matricula_serv').setValue('');
    }
  }

  consultaLocal(dados) {
    // https://www.blogson.com.br/como-formatar-campos-de-cpf-cep-telefone-e-moeda-com-jquery-jmask/
    if (dados.length > 1 || dados.length == 0) {

    } else {
      this.form2.get('id_lotacao').setValue(dados[0].id_lotacao);
    }
  }


  getServInfo2() {
    let id_cpf = this.form2.get('secondCtrl').value;
    if (id_cpf) {
      this.visitaService.getServInfo(id_cpf)
        .subscribe(dados => this.consultaLocal(dados));
    }
  }
  getListaVisitantes() {
    this.visitanteService.getListaVisitantes()
      .subscribe(
        (visitantes: Visitantes[]) => {
          this.visitantes = visitantes;
        })

  }
  getListaServidores() {
    this.visitaService.getListaServ()
      .subscribe(
        (servidores: Servidores[]) => {
          this.servidores = servidores;
        })

  }
  getListaLocal() {
    this.visitaService.getListaLocal()
      .subscribe(
        (lotacoes: Lotacao[]) => {
          this.lotacoes = lotacoes;
        })
    // , () => {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")
    // })
  }
  setVisitado(dados) {
    let id_cpf_visitado = dados[0].id_cpf;
    this.formFinal.get('id_cpf_visitado').setValue(id_cpf_visitado);
  }
  setVisitante(dados) {
    let id_cpf = dados[0].id_cpf;
    this.formFinal.get('id_cpf').setValue(id_cpf);
  }
}
