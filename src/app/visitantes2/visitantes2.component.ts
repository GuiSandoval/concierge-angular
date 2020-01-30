import { Component, OnInit } from '@angular/core';
import { Visitantes } from 'app/interfaces/visitantes';
import { BlackList } from 'app/interfaces/black-list';
import { VisitanteService } from 'app/services/visitante.service';

@Component({
  selector: 'app-visitantes2',
  templateUrl: './visitantes2.component.html',
  styleUrls: ['./visitantes2.component.scss']
})
export class Visitantes2Component implements OnInit {
  teste: boolean = true;
  id_cpf: string;
  iId: string;
  protected visitantes: Visitantes[];
  public blackList: BlackList[];

  constructor(private visitanteService: VisitanteService) { }

  ngOnInit() {
    this.getListaVisitantes();
    // this.testee();
    this.getListaBlackList();
  }

  getListaVisitantes() {
    this.visitanteService.getListaVisitantes()
      .subscribe(
        (visitantes: Visitantes[]) => {
          this.visitantes = visitantes;
        })
    // }, ()=> {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  }
  getListaBlackList() {
    this.visitanteService.getBlackList()
      .subscribe(
        (blackList: BlackList[]) => {
          this.blackList = blackList;
        })
    // }, ()=> {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  }
  addBlackList(id_cpf, id_black_list ) {
    console.log(id_cpf);
    console.log(id_black_list);

    if(id_black_list == 1){
      this.visitanteService.removeBlackList(id_cpf).subscribe(response =>{
        console.log(response);
      })
    }else{
      this.visitanteService.addBlacklist(id_cpf).subscribe(response =>{
        console.log(response);
        console.log(response.status);
      });
    }
 
    


  }
  // getVisitante(){
  //   tId ='';
  //   this.visitanteService.getVisitante(tId)
  //   .subscribe((visitantes: Visitantes[]) =>{
  //     this.visitantes = visitantes;xvf
  //   }, ()=> {this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  // }

  existeVisitantes(): boolean {
    return this.visitantes && this.visitantes.length > 0;
  }
  verificaBL(visitanteBL: number): boolean {
    return visitanteBL == 0 && visitanteBL > 0;
  }
  classBL(visitanteBL: number) {
    if (visitanteBL == 1)
      return 'bg-danger text-white'
  }
  classBBL(visitanteBL: number) {
    if (visitanteBL == 1)
      return 'border border-danger'
  }
  testee(vitanteCpf: string) {
    if (vitanteCpf == undefined) {
      console.log('x');
    } else {
      console.log('olá ' + vitanteCpf);
    }
  }

}
