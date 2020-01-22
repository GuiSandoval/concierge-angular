import { LoginComponent } from './../../login/login.component';
import { UsuariosComponent } from './../../usuarios/usuarios.component';
import { CadastroVisita2Component } from './../../visitas/cadastro-visita2/cadastro-visita2.component';
import { CadastroVisitaComponent } from './../../visitas/cadastro-visita/cadastro-visita.component';
import { VisitasComponent } from './../../visitas/visitas.component';
import { CadastroVisitanteComponent } from './../../visitantes/cadastro-visitante/cadastro-visitante.component';
import { VisitantesComponent } from './../../visitantes/visitantes.component';
import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    // { path: 'Inicio',      component: VisitantesComponent },
    { path: 'inicio',               component: DashboardComponent },
    { path: 'visitantes',           component: VisitantesComponent },
    { path: 'visitantes/criar',     component: CadastroVisitanteComponent },
    { path: 'visitas',              component: VisitasComponent },
    { path: 'visitas/cadastro',     component: CadastroVisitaComponent },
    { path: 'visitas/cadastro2',    component: CadastroVisita2Component },
    { path: 'usuarios',             component: UsuariosComponent },
    // { path: 'login',                component: LoginComponent}

];
