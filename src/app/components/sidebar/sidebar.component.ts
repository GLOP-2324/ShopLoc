import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  protected readonly localStorage = localStorage;
  menuItems: { path: string, name: string, iconClass: string }[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = event.url;
        this.updateMenuItems(currentRoute);

      }
    });
  }

  private updateMenuItems(currentRoute: string): void {
    // @ts-ignore
    if (localStorage.getItem('roleId') == 1) {
      this.menuItems = [
        {path: '/admin/dashboard', name: 'Dashboard', iconClass: 'fa fa-dashboard'},
        {path: '/admin/Utilisateurs', name: 'Utilisateurs', iconClass: 'fa fa-user'},
      ];
    } else { // @ts-ignore
      if (localStorage.getItem('roleId') == 2) {
        this.menuItems = [
          {path: '/commercant/dashboard', name: 'Dashboard', iconClass: 'fa fa-dashboard'},
          {path: '/commercant/clients', name: 'Clients', iconClass: 'fa fa-user'},
          {path: '/commercant/types', name: 'Types', iconClass: 'fa fa-gear'},
          {path: '/commercant/produits', name: 'Produits', iconClass: 'fa fa-product-hunt'},
          {path: '/commercant/analyses', name: 'Analyses', iconClass: 'fa fa-pie-chart'},
          {path: '/commercant/commandes', name: 'Commandes', iconClass: 'fa fa-shopping-basket'}

        ];
      }
      // @ts-ignore
      else if (localStorage.getItem('roleId') == 3) {
        {
          this.menuItems = [
            {path: '/client/Achats', name: 'Achats', iconClass: 'fa fa-shopping-basket'},
            {path: '/client/Avantages', name: 'Avantages', iconClass: 'fa fa-plus'},
            {path: '/client/Card', name: 'Carte de fidélité', iconClass: 'fa fa-credit-card'},

          ];
        }
      }
    }
  }
  updateProfile()
  {
    this.router.navigate(['/', 'profile']);
  }
}



