import { Servidores } from './../../interfaces/serv';
import { Component, OnInit } from '@angular/core';
import { VisitanteService } from 'app/services/visitante.service';
import { Visitantes } from 'app/interfaces/visitantes';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-visita',
  templateUrl: './cadastro-visita.component.html',
  styleUrls: ['./cadastro-visita.component.scss']
})
export class CadastroVisitaComponent implements OnInit {
  public visitantes: Visitantes[];
  public servidores: Servidores[];
  myControl = new FormControl();
  myControl2 = new FormControl();
  formulario :FormGroup;
  visitaService: any;




  constructor(
    private visitanteService: VisitanteService,
    private formBuilder : FormBuilder
    ) { }
  ngOnInit() {
    this.getListaVisitantes();
    this.getListaServidores();
    
    this.formulario = this.formBuilder.group({
      id_cpf: [null],
      id_cpf_visitado: [null],
      txt_observacoes: [null]
    });

  }


  
  getListaVisitantes(){
    this.visitanteService.getListaVisitantes()
    .subscribe(
      (visitantes: Visitantes[]) =>{
      this.visitantes = visitantes;})
    // }, ()=> {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  }
  getListaServidores(){
    this.visitaService.getListaServ()
    .subscribe(
      (servidores: Servidores[]) =>{
      this.servidores = servidores;})
    // }, ()=> {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  }
  // teste = Object.keys(this.visitantes).length;
  teste =this.visitantes;  

  
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }






}

let el = '';
$(function() {
  $(".btn-toggle").click(function(e) {
    e.preventDefault();
    el = $(this).data('element');
    $(el).toggle();
  });
});

