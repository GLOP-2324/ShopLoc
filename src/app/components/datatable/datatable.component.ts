import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ngOnInit() {
    this.dtOptions={
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


}



