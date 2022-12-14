import { AuthService } from 'app/services/auth.service';
import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    access: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/inicio', title: 'Inicio',  icon: 'home', class: '' },
    // { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
    { path: '/inicio',      title: 'Inicio',      icon: 'home',               class: '',   access:"1" },
    { path: '/visitas',     title: 'Visitas',     icon:'how_to_reg',          class: '',   access:"2" },
    { path: '/visitantes',  title: 'Visitantes',  icon:'supervisor_account',  class: '',   access:"1" },
    { path: '/usuarios',    title: 'Usuarios',    icon: 'account_box',        class: '',   access:"3" }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public idTipoUsuario = this.authService.getTipoUser();
  // public idTipoUsuario = 1;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
