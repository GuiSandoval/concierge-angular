import { CadastroUsuariosComponent } from './../../usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { VisitanteResolverGuard } from './../../guards/visitante-resolver.guard';
import { AdminGuard } from './../../guards/admin.guard';
import { UserGuard } from './../../guards/user.guard';
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
import { Visitas2Component } from 'app/visitas2/visitas2.component';
import { CadastroVisitante2Component } from 'app/visitantes/cadastro-visitante2/cadastro-visitante2.component';
import { UsuarioResolverGuard } from 'app/guards/usuario-resolver.guard';

export const AdminLayoutRoutes: Routes = [
  
    { path: 'inicio',                   component: DashboardComponent,              canActivate: [AuthGuard] },
    { path: 'visitantes',               component: VisitantesComponent,             canActivate: [AuthGuard] },
    { path: 'visitantes2',              component: Visitantes2Component,            canActivate: [AuthGuard] },
    { path: 'visitantes/cadastro',      component: CadastroVisitante2Component,     canActivate: [AuthGuard],   resolve:{visitante : VisitanteResolverGuard} },
    { path: 'visitantes/cadastro2',     component: CadastroVisitanteComponent,      canActivate: [AuthGuard]},
    { path: 'visitantes/editar/:id',    component: CadastroVisitante2Component,     canActivate: [AuthGuard],   resolve:{visitante : VisitanteResolverGuard}},
    { path: 'visitas2',                 component: VisitasComponent,                canActivate: [AuthGuard,UserGuard] },
    { path: 'visitas',                  component: Visitas2Component,               canActivate: [AuthGuard,UserGuard] },
    { path: 'visitas/cadastro',         component: CadastroVisitaComponent,         canActivate: [AuthGuard] },
    { path: 'visitas/cadastro2',        component: CadastroVisita2Component,        canActivate: [AuthGuard] },
    { path: 'usuarios',                 component: UsuariosComponent,               canActivate: [AuthGuard,AdminGuard] },
    { path: 'usuarios/cadastro',        component: CadastroUsuariosComponent,       canActivate: [AuthGuard,AdminGuard],resolve:{usuario : UsuarioResolverGuard}  },
    { path: 'usuarios/editar/:id_cpf',      component: CadastroUsuariosComponent,       canActivate: [AuthGuard,AdminGuard],resolve:{usuario : UsuarioResolverGuard}  },
    // { path: 'login',                component: LoginComponent}

];
