import { VisitanteService } from 'app/services/visitante.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

declare var $: any;


@Component({
  selector: 'app-cadastro-visitante',
  templateUrl: './cadastro-visitante.component.html',
  styleUrls: ['./cadastro-visitante.component.scss']
})
export class CadastroVisitanteComponent implements OnInit {

  private formulario: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private http : Http,
    private router: Router,
    private visitante : VisitanteService
    ) { }

  ngOnInit() {

      // this.formulario = new FormGroup({
      //   nome: new FormControl(null),
      //   cpf: new FormControl(null)
      // });

    this.formulario = this.formBuilder.group({
      nome: [null],
      id_cpf: [null],
      telefone: [null],
      ci: [null],
      matricula: [null],
      cargo: [null],
      foto_visit: [null],
      orgao_origem: [null]
    });

  }

  onSubmit(){
    console.log(this.formulario.value);
    // this.http.post('http://localhost/visitantes-sejus/?cadastro', JSON.stringify(this.formulario.value))
    // .subscribe(dados => {
    //   // console.log(dados)
    //   console.log(dados.status)
    //   this.showNotification('top','right','Cadastro realizado com Sucesso',2)
    //   // reseta o form
    //   this.formulario.reset;
    //   this.router.navigate(['/visitantes']);
    // },
    // (error: any ) =>alert(JSON.stringify(error.json())));
    // (error: any = 502) => this.showNotification('top','right',status,4));
    // (error: any) => this.showNotification('top','right',JSON.stringify(error.json()),4));
    //(click)="showNotification('top','right')"
    this.visitante.addVisitante2( JSON.stringify(this.formulario.value)).subscribe(
      success => console.log('sucesso'),
      error => console.log(error),
      () => console.log('request completo')
    );

  }

  showNotification(from, align, text, typee){
    const type = ['','info','success','warning','danger'];

    // const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: text
        // message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    },{
        // type: type[2],
        type: type[typee],
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">error_outline</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  

  }


}

