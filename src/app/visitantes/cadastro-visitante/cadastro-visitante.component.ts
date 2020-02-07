import { CadVisitante } from './../../interfaces/cad-visitante';
import { Visitantes } from './../../interfaces/visitantes';
import { AlertModalService } from './../../components/alert-modal.service';
import { VisitanteService } from 'app/services/visitante.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-visitante',
  templateUrl: './cadastro-visitante.component.html',
  styleUrls: ['./cadastro-visitante.component.scss']
})
export class CadastroVisitanteComponent implements OnInit {

  private formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: Http,
    private router: Router,
    private visitante: VisitanteService,
    private notification: AlertModalService,
    // private location : Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    //Error OK - COMENTAR Código 
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const visitante$ = this.visitante.getVisitante(id);
    //     visitante$.subscribe(visitantes => {
    //       console.log(visitantes[0]);
    //       this.updateForm(visitantes[0]);
    //     });
    //   }
    // )
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      id_cpf: [null, Validators.required],
      telefone: [null],
      ci: [null],
      matricula: [null],
      cargo: [null],
      foto_visit: [null],
      orgao_origem: [null]
    });

  }

  updateForm(visitante) {
    this.formulario.patchValue({
      id_cpf: visitante.id_cpf,
      nome: visitante.nome,
      telefone: visitante.telefone,
      ci: visitante.ci,
      matricula: visitante.matricula,
      cargo: visitante.cargo,
      foto_visit: visitante.foto_visit,
      orgao_origem: visitante.orgao_origem
    })
  }
  onSubmit() {
    this.visitante.addVisitante(this.formulario.value).subscribe(resp => {
      if (resp.status == 'error') {

        this.notification.showNotification(resp.dados, 4);

      } else if (resp.status == 'success') {

        this.notification.showNotification(resp.dados, 2);
        this.formulario.reset;
        this.router.navigate(['/visitantes']);
      }
    });
  }
}

