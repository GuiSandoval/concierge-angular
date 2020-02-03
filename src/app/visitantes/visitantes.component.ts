import { AuthService } from 'app/services/auth.service';
import { BlackList } from './../interfaces/black-list';
import { FilterPipe } from './../filter.pipe';
import { Visitantes } from './../interfaces/visitantes';
import { Component, OnInit, ViewChild } from '@angular/core';
import { VisitanteService } from 'app/services/visitante.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];


@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.scss'],
  // pipes: 'FilterPipe'

})
export class VisitantesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'progress','matricula','info'];
  dataSource: MatTableDataSource<Visitantes>;
  visitantes: Visitantes[];
  public idTipoUsuario : number = this.authService.getTipoUser();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  blackList: BlackList[];

  constructor(private visitanteServ: VisitanteService,
    private authService: AuthService) { }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.getListaVisitantes();
    this.getListaBlackList();


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
          // this.dataSource.sort = this.sort;
        })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addBlackList(id_cpf, id_black_list) {
    console.log(id_cpf);
    console.log(id_black_list);

    if (id_black_list == 1) {
      this.visitanteServ.removeBlackList(id_cpf).subscribe(response => {
        console.log(response);
      })
    } else {
      this.visitanteServ.addBlacklist(id_cpf).subscribe(response => {
        console.log(response);
        console.log(response.status);
      });
    }

  }
}
