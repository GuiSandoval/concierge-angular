import { VisitaService } from './../services/visita.service';
import { Visitas } from './../interfaces/visitas';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitas',
  templateUrl: './visitas.component.html',
  styleUrls: ['./visitas.component.scss']
})
export class VisitasComponent implements OnInit {

  public visitas: Visitas[];

  constructor(private visitaService: VisitaService ) { }

  ngOnInit() {
    this.getListaVisita();
  }

  getListaVisita(){
    this.visitaService.getListaVisitas()
    .subscribe(
      (visitas : Visitas[]) =>{
        this.visitas = visitas;})
  }

}
