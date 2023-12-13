import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { StoreService } from '../../shared/service/StoreService';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  store: any = [];
  storeSets: any[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit() {
    this.storeService.getStore().subscribe((data) => {
      this.store = data;
      console.log(this.store);

      // Group items in sets of three
      this.groupItems();
    });
  }

  private groupItems() {
    // Clear existing sets
    this.storeSets = [];

    // Group items in sets of three
    for (let i = 0; i < this.store.length; i += 3) {
      this.storeSets.push(this.store.slice(i, i + 3));
    }
  }
}
