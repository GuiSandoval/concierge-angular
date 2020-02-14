
import { CadastroVisitaComponent } from './../../visitas/cadastro-visita/cadastro-visita.component';
import { VisitasComponent } from './../../visitas/visitas.component';
import { FormDebugComponent } from './../../components/form-debug/form-debug.component';
import { CadastroVisitanteComponent } from './../../visitantes/cadastro-visitante/cadastro-visitante.component';
import { FilterPipe } from './../../filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { VisitantesComponent } from './../../visitantes/visitantes.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { SelectModule } from 'ng2-select';
import { Filter3Pipe } from 'app/filter3.pipe';
import { CadastroVisita2Component } from 'app/visitas/cadastro-visita2/cadastro-visita2.component';
import { Filter4Pipe } from 'app/filter4.pipe';
import { UsuariosComponent } from 'app/usuarios/usuarios.component';
import {A11yModule} from '@angular/cdk/a11y';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material';
import { Visitantes2Component } from 'app/visitantes2/visitantes2.component';
import { Visitas2Component } from 'app/visitas2/visitas2.component';
import { CdkDetailRowDirective } from 'app/visitas2/cdk-detail-row.directive';
import { CadastroVisitante2Component } from 'app/visitantes/cadastro-visitante2/cadastro-visitante2.component';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialFileInputModule } from 'ngx-material-file-input';


// import { LoginComponent } from 'app/login/login.component';

export const options2: Partial<any> | (() => Partial<any>) = undefined;


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
    MatStepperModule,
    MatTableModule,
    A11yModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    PortalModule,
    // ScrollingModule,
    NgxMaskModule.forRoot(options2),
    MaterialFileInputModule
    
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
    Visitantes2Component,
    Visitas2Component,
    CdkDetailRowDirective,
    CadastroVisitante2Component,

  ],
  entryComponents: [Visitas2Component],
  bootstrap: [Visitas2Component],
})

export class AdminLayoutModule {}
