import { LoginComponent } from './../../login/login.component';
import { UsuariosComponent } from './../../usuarios/usuarios.component';
import { CadastroVisita2Component } from './../../visitas/cadastro-visita2/cadastro-visita2.component';
import { CadastroVisitaComponent } from './../../visitas/cadastro-visita/cadastro-visita.component';
import { VisitasComponent } from './../../visitas/visitas.component';
import { CadastroVisitanteComponent } from './../../visitantes/cadastro-visitante/cadastro-visitante.component';
import { VisitantesComponent } from './../../visitantes/visitantes.component';
import { Routes, CanActivate } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { Visitantes2Component } from 'app/visitantes2/visitantes2.component';

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
    { path: 'inicio',               component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'visitantes',           component: VisitantesComponent, canActivate: [AuthGuard] },
    { path: 'visitantes2',           component: Visitantes2Component, canActivate: [AuthGuard] },
    { path: 'visitantes/criar',     component: CadastroVisitanteComponent, canActivate: [AuthGuard] },
    { path: 'visitas',              component: VisitasComponent, canActivate: [AuthGuard] },
    { path: 'visitas/cadastro',     component: CadastroVisitaComponent, canActivate: [AuthGuard] },
    { path: 'visitas/cadastro2',    component: CadastroVisita2Component, canActivate: [AuthGuard] },
    { path: 'usuarios',             component: UsuariosComponent, canActivate: [AuthGuard] },
    // { path: 'login',                component: LoginComponent}

];
