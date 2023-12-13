import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NavigationEnd, Router} from "@angular/router";
import {AccountService} from "../../shared/service/accountService";
import {StoreService} from "../../shared/service/StoreService";
import {ToastrService} from "ngx-toastr";
import {Product} from "../../shared/model/Product";
import {Store} from "../../shared/model/Store";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  protected readonly localStorage = localStorage;

  tableHeaders: string[] = [];
  products: any[] = [];
  dataRows: any[] = [];
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      language: {
        emptyTable: 'Aucune donnée disponible dans le tableau',
        lengthMenu: 'Afficher _MENU_ éléments',
        loadingRecords: 'Chargement...',
        processing: 'Traitement...',
        zeroRecords: 'Aucun élément correspondant trouvé',
        paginate: {
          first: 'Premier',
          last: 'Dernier',
          previous: 'Précédent',
          next: 'Suiv'
        },
        decimal: ',',
        info: 'Affichage de _START_ à _END_ sur _TOTAL_ éléments',
        infoEmpty: 'Affichage de 0 à 0 sur 0 éléments',
        search: 'Rechercher:',
        searchPlaceholder: '...',
        thousands: '.',
        infoFiltered: '(filtrés depuis un total de _MAX_ éléments)',
      }
    };
  }

  constructor(private router: Router,
              private storeService: StoreService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd event:', localStorage);
        this.updateDynamicControls(event.url);
      }
    });
  }

  private updateDynamicControls(currentRoute: string): void {
    if (currentRoute.startsWith('/commercant/produits')) {
      const email = localStorage.getItem('email');
      if (email) {
        this.storeService.findSToreByEmail(email).subscribe(
          (store: any) => {
            this.tableHeaders=['Libelle', 'Description', 'Price'];
            // @ts-ignore
            this.storeService.getProduct(store.id).subscribe((products:Product[]) => {
              this.dataRows = products;
              console.log(this.dataRows,'hello')
            });

          },
          (error) => {
            console.error('Error fetching store:', error);
          }
        );
      }

    }
    if (currentRoute.startsWith('/commercant/type')) {
      this.tableHeaders=['Libelle'];
      // @ts-ignore
      this.storeService.getTypeProduct().subscribe((products:any[]) => {
        this.dataRows = products;
        console.log(this.dataRows,'hello')
      });


    }
    }

}


