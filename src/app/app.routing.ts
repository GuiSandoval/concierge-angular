import { VisitantesComponent } from './visitantes/visitantes.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  // {
  //   path: 'dashboard',
  //   canActivate: [AuthGuard],
  //   component: DashboardComponent
  // },
  {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [{
          path: '',
          // redirectTo:'/inicio',
          loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]
      },
  {
    path: 'login',
    component: LoginComponent,
  },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' },
];

// const routes: Routes =[
//   {
//     path: '',
//     redirectTo: 'inicio',
//     pathMatch: 'full',
//   }, {
//     path: '',
//     component: AdminLayoutComponent,
//     children: [{
//       path: '',
//       loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
//     }]
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
