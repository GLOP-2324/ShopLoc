import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../shared/service/StoreService';
import {SearchService} from "../../shared/service/SearchService";
import {SharedService} from "../../shared/service/SharedService";


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  store: any = [];
  storeSets: any[] = [];
  filteredStoreSets: any[] = [];
  searchTerm: string = '';

  constructor(
    private storeService: StoreService,
    private sharedService: SharedService // Injection du service de recherche
  ) { }

  ngOnInit() {
    this.storeService.getStore().subscribe((data) => {
      this.store = data;
      this.groupItems();
      // Initialize filtered store sets with all sets
      this.filteredStoreSets = [...this.storeSets];
    });
    this.sharedService.getCurrentObject().subscribe((searchTerm: string) => {
      if (searchTerm) {

        this.searchTerm = searchTerm;
        // @ts-ignore
        this.filterStoreSets(searchTerm);
      }
      else{
        this.storeService.getStore().subscribe((data) => {
          this.store = data;
          this.groupItems();
          // Initialize filtered store sets with all sets
          this.filteredStoreSets = [...this.storeSets];
        });
      }
    })
  }


  filterStoreSets(searchTerm: string) {
    if (!searchTerm) {
      this.filteredStoreSets = [...this.storeSets];
    } else {
      this.filteredStoreSets = this.storeSets.filter(set =>
        set.some((item: { name: string; }) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      const filteredItems = this.filteredStoreSets
        .map(set => set.filter((item: { name: string; }) => item.name.toLowerCase().includes(searchTerm.toLowerCase())))
        .reduce((acc, val) => acc.concat(val), []);
      this.filteredStoreSets = [filteredItems];
    }
  }



  private groupItems() {
    this.storeSets = [];
    for (let i = 0; i < this.store.length; i += 3) {
      this.storeSets.push(this.store.slice(i, i + 3));
    }
  }
}
