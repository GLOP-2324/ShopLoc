import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {StoreService} from "../../shared/service/StoreService";
import {Product} from "../../shared/model/Product";
import {SharedService} from "../../shared/service/SharedService";
import {ClientService} from "../../shared/service/clientService";
import {TableHeader} from "../../shared/model/TableHeader"

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})

export class DatatableComponent implements OnInit {
  titreDatatable = ""
  protected readonly localStorage = localStorage;
  currentRoute: string = ''
  protected tableHeaders: TableHeader[] = [];
  products: any[] = [];
  dataRows: any[] = [];
  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.updateDynamicControls(this.currentRoute);

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
              private sharedService: SharedService,
              private clientService: ClientService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateDynamicControls(event.url);
      }
    });
  }

  private updateDynamicControls(currentRoute: string): void {
    if (currentRoute.startsWith('/commercant/produits')) {
      this.titreDatatable = "Liste des produits"
      const email = localStorage.getItem('email');
      if (email) {
        this.storeService.findSToreByEmail(email).subscribe(
          (store: any) => {
            this.tableHeaders = [
              {label: 'Produit', key: 'libelle'},
              {label: 'Prix', key: 'price'},
              {label: 'Description', key: 'description'},
              {label: 'Points', key: 'points'},
              {label: 'Avantage', key: 'benefitsActivated'},
              {label: 'Stock', key: 'stock'}]
            // @ts-ignore
            this.storeService.getProduct(store.id).subscribe((products: Product[]) => {
              this.dataRows = products;
            });

          },
          (error) => {
            console.error('Error fetching store:', error);
          }
        );
      }

    }
    if (currentRoute.startsWith('/commercant/type')) {
      this.titreDatatable = "Liste des types produits"
      this.tableHeaders = [{label: 'Produit', key: 'libelle'}];
      // @ts-ignore
      this.storeService.getTypeProduct().subscribe((products: any[]) => {
        console.log(products)
        this.dataRows = products;
      });
    }
    if (currentRoute.startsWith('/client')) {
      this.titreDatatable = "Liste des achats"
      this.tableHeaders = [
        {label: 'Date', key: 'date'},
        {label: 'Magasin', key: 'storeName'},
        {label: 'Produit', key: 'productName'},
        {label: 'Quantité', key: 'quantity'},
        {label: 'Montant dépensé', key: 'moneySpent'}
      ];
      // @ts-ignore
      this.clientService.getHistoriqueAchat(localStorage.getItem("email")).subscribe((products: any[]) => {
        console.log(products);
        this.dataRows = products;
      });
    }
    if (currentRoute.startsWith('/admin')) {
      this.titreDatatable = "Liste des commerçants"
      this.tableHeaders = [
        {label: 'Name', key: 'name'},
        {label: 'Email', key: 'email'},
      ]
      // @ts-ignore
      this.storeService.getStore().subscribe((commercants: any[]) => {
        console.log(commercants, 'kk')
        this.dataRows = commercants;
      });
    }
  }

  navigateToForm(object: any) {
    this.sharedService.setCurrentObject(object);
    console.log(object)
  }

}


