import { CadastroVisitaComponent } from './../../visitas/cadastro-visita/cadastro-visita.component';
import { VisitasComponent } from './../../visitas/visitas.component';
import { FormDebugComponent } from './../../components/form-debug/form-debug.component';
import { CadastroVisitanteComponent } from './../../visitantes/cadastro-visitante/cadastro-visitante.component';
import { FilterPipe } from './../../filter.pipe';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VisitantesComponent } from './../../visitantes/visitantes.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { SelectModule } from 'ng2-select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';



import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatStepperModule,
} from '@angular/material';
import { HttpModule } from '@angular/http';
import { Filter3Pipe } from 'app/filter3.pipe';
import { CadastroVisita2Component } from 'app/visitas/cadastro-visita2/cadastro-visita2.component';
import { Filter4Pipe } from 'app/filter4.pipe';
import { UsuariosComponent } from 'app/usuarios/usuarios.component';
// import { LoginComponent } from 'app/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    HttpClientModule,
    SelectModule,
    MatAutocompleteModule,
    MatStepperModule
  ],
  declarations: [
    DashboardComponent,
    VisitantesComponent,
    FilterPipe,
    CadastroVisitanteComponent,
    FormDebugComponent,
    VisitasComponent,
    CadastroVisitaComponent,
    Filter3Pipe,
    CadastroVisita2Component,
    Filter4Pipe,
    UsuariosComponent,
    // LoginComponent
  ]
})

export class AdminLayoutModule {}
