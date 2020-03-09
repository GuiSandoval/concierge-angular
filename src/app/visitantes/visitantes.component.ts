import { Location } from '@angular/common';
import { AlertModalService } from './../components/alert-modal.service';
import { Visitas } from 'app/interfaces/visitas';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { BlackList } from './../interfaces/black-list';
import { FilterPipe } from './../filter.pipe';
import { Visitantes } from './../interfaces/visitantes';
import { Component, OnInit, ViewChild, Directive, EventEmitter, Output } from '@angular/core';
import { VisitanteService } from 'app/services/visitante.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { VisitaService } from 'app/services/visita.service';
import { delay, filter } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  formAddBL: FormGroup
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
    private visitaService: VisitaService,
    private not : AlertModalService,
    private locattion : Location,
    private fb: FormBuilder,
    ) { }

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');

  ngOnInit() {
    this.getListaVisitantes();
    this.getListaBlackList();
    this.formAddBL = this.fb.group({
      id_cpf : [null, [Validators.required]],
      nome : [null, [Validators.required]],
      observacoes : [null, [Validators.required]]
    });
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

  verBlackList(id_cpf, id_black_list,nome) {
    // console.log(id_cpf);
    // console.log(id_black_list);

    if (id_black_list == 1) {
      this.visitanteServ.removeBlackList(id_cpf).subscribe(response => {
        this.not.showNotification(response,2)
      })
      this.router.navigateByUrl('visitantes')
      // this.showModal();
    } else {
      this.formAddBL.controls.id_cpf.setValue(id_cpf);
      this.formAddBL.controls.nome.setValue(nome);
      this.formAddBL.controls.id_cpf.disable();
      this.formAddBL.controls.nome.disable();
      this.showModal();

      // this.visitanteServ.addBlacklist(id_cpf).subscribe(response => {
      //   this.not.showNotification(response,2)
      // });
      // this.router.navigateByUrl('visitantes');
    }

  }
  verificaTipoUser(){
    return this.idTipoUsuario == 3;
  }

  showModal(){
   (<any>$('#modalAddBL')).modal('show');
  }
  addBlackList(){
    (<any>$('#modalAddBL')).modal('hide');
    let query = this.formAddBL.getRawValue();
    // console.log(query);
      this.visitanteServ.addBlacklist(query).subscribe(response => {
        this.not.showNotification(response,2)
      });
      this.router.navigateByUrl('visitantes');
  }
  
}