import { Visitas } from 'app/interfaces/visitas';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { BlackList } from './../interfaces/black-list';
import { FilterPipe } from './../filter.pipe';
import { Visitantes } from './../interfaces/visitantes';
import { Component, OnInit, ViewChild, Directive, EventEmitter, Output } from '@angular/core';
import { VisitanteService } from 'app/services/visitante.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VisitaService } from 'app/services/visita.service';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  // pipes: 'FilterPipe'

})
export class VisitantesComponent implements OnInit {
  displayedColumns: string[] = ['id_cpf', 'nome', 'identidade','matricula'];
  dataSource: MatTableDataSource<Visitantes>;
  public visitantes: Visitantes[];
  public visitas: Visitas[];
  public teste3;
  public idTipoUsuario : number = this.authService.getTipoUser();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  blackList: BlackList[];



  constructor(
    private visitanteServ: VisitanteService,
    private authService: AuthService,
    private router : Router,
    private route: ActivatedRoute,
    private visitaService: VisitaService) { }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.getListaVisitantes();
    this.getListaBlackList();
  }
  onEdit(id){
    // console.log(id);
    this.router.navigate(['visitantes/editar/', id])
    // this.router.navigate(['visitantes/cadastro'])
  }
  getListaBlackList() {
    this.visitanteServ.getBlackList()
      .subscribe(
        (blackList: BlackList[]) => {
          this.blackList = blackList;
        })
  }

  getListaVisitantes() {
    return this.visitanteServ.getListaVisitantes()
      .subscribe(
        (visitantes: Visitantes[]) => {
          this.visitantes = visitantes;
          this.dataSource = new MatTableDataSource(this.visitantes);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }
  getListaVisitaVisitante(id_cpf){
    let rVisita;
    this.visitaService.getListaVisitasPesq(id_cpf)
    .subscribe(
      (visitas:Visitas[]) =>{ 
        rVisita = visitas;
        console.log(rVisita)
      }
    );
    return rVisita;
    // let tteste = ['ola','teste'];
    // this.teste3 = tteste;
    // console.log('Dentro Função '+tteste);
    // console.log('Fora Função' + this.teste3);
    // return this.teste3;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  addBlackList(id_cpf, id_black_list) {
    // console.log(id_cpf);
    // console.log(id_black_list);

    if (id_black_list == 1) {
      this.visitanteServ.removeBlackList(id_cpf).subscribe(response => {
        // console.log(response);
      })
    } else {
      this.visitanteServ.addBlacklist(id_cpf).subscribe(response => {
        // console.log(response);
        // console.log(response.status);
      });
    }

  }
  verificaTipoUser(){
    return this.idTipoUsuario == 3;
  }

}