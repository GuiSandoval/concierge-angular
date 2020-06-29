import { AuthService } from './../services/auth.service';
import { BlackList } from './../interfaces/black-list';
import { VisitanteService } from 'app/services/visitante.service';
import { Component, OnInit, Inject } from '@angular/core';
import * as Chartist from 'chartist';
import { Visitantes } from 'app/interfaces/visitantes';
import { VisitaService, relVisita } from 'app/services/visita.service';
import { Visitas } from 'app/interfaces/visitas';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public visitantes: Visitantes[];
  public visitas: Visitas[];
  public blackList : BlackList[];
  public teste;
  public nVisita;
  public nVisitaBl;
  public nRelVisita;
  public nDRelVisita;
  public idTipoUsuario = this.authService.getTipoUser();
  animal: string;
  name: string;

  constructor(private visitanteService: VisitanteService,
    private visitaService: VisitaService,
    private authService : AuthService,) { }
    
  getListaBlackList() {
    this.visitanteService.getBlackList()
      .subscribe(
        (blackList: BlackList[]) => {
          this.blackList = blackList;
          this.nVisitaBl = blackList.length
        })
    // }, ()=> {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  }
  getListaVisita() {
    this.visitaService.getListaVisitas()
      .subscribe(
        (visitas: Visitas[]) => {
          this.visitas = visitas;
          this.nVisita = visitas.length;
        })
  }
  getListaVisitantes() {
    this.visitanteService.getListaVisitantes()
      .subscribe(
        (visitantes: Visitantes[]) => {
          this.visitantes = visitantes;
          this.teste = visitantes.length;
        })
    // }, ()=> {
    //   this.errorMsgComponent.setErro("Falha ao listar Visitantes!")})
  }
  getRelVisita(tipoRel,id,tipo_grafico){
    this.visitaService.getRelVisita(tipoRel)
    .subscribe((relVisitas: relVisita) => {
      this.nRelVisita = relVisitas.qtdRel;
      this.nDRelVisita = relVisitas.meses;
      console.log(this.nRelVisita);
      this.graficoLinear(this.nDRelVisita,this.nRelVisita,id,tipo_grafico);
    });
  }
  graficoLinear(rotulo,valores,id,tipo_grafico){

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: rotulo,
      series: [valores]
    };
    
    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: Math.max.apply(null, valores) + 5,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
    }
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var completedTasksChart = new Chartist.Line(id, dataCompletedTasksChart, optionsCompletedTasksChart,responsiveOptions);

    // start animation for the Completed Tasks Chart - Line Chart
    tipo_grafico==0 ? this.startAnimationForLineChart(completedTasksChart) : this.startAnimationForBarChart(completedTasksChart);

    // this.startAnimationForLineChart(completedTasksChart);

  }

  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 200;
    durations = 1000;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    this.getListaBlackList();
    this.getListaVisita();
    this.getListaVisitantes();
    this.getRelVisita('0','#dailySalesChart',0);
    this.getRelVisita('1','#completedTasksChart',1);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }

}


$(document).on('show.bs.modal', '.modal', function (event) {
  const zIndex = 1045 + (10 * $('.modal:visible').length);
  // this zIndex can be assigned to the time-picker
  $(this).css('z-index', zIndex);
  setTimeout(function () {
    $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
  }, 0);
});
