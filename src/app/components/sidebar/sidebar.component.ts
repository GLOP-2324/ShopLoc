import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

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
        this.updateMenuItems(event.url);
      }
    });
  }

  private updateMenuItems(currentRoute: string): void {
    if (currentRoute.startsWith('/admin')) {
      this.menuItems = [
        { path: '/admin/dashboard', name: 'Dashboard', iconClass: 'fa fa-dashboard' },
        { path: '/admin/Utilisateurs', name: 'Utilisateurs', iconClass: 'fa fa-user' },
      ];
    } else if (currentRoute.startsWith('/commercant')) {
      this.menuItems = [
        { path: '/commercant/dashboard', name: 'Dashboard', iconClass: 'fa fa-dashboard' },
        { path: '/commercant/clients', name: 'Clients', iconClass: 'fa fa-user' },
        { path: '/commercant/types', name: 'Types', iconClass: 'fa fa-gear' },
        { path: '/commercant/produits', name: 'Produits', iconClass: 'fa fa-product-hunt' },
        { path: '/commercant/avantages', name: 'Avantages', iconClass: 'fa fa-gift' },
        { path: '/commercant/analyses', name: 'Analyses', iconClass: 'fa fa-pie-chart' },
        { path: '/commercant/commandes', name: 'Commandes', iconClass: 'fa fa-shopping-basket' }

      ];
    }
    else  {
      this.menuItems = [
        { path: '/client', name: 'Achats', iconClass: 'fa fa-shopping-basket' },
        { path: '/client/Avantages', name: 'Avantages', iconClass: 'fa fa-plus' },


      ];
    }
  }


}
