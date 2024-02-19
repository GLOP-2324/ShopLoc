import {Component, Input, OnInit} from '@angular/core';
import {StoreService} from "../../shared/service/StoreService";
import {environment} from "../../../environment/environment";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../shared/service/cartService";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @Input() product: any;
  products: any = [];
 localStorage = localStorage;
  Api = environment.BACKEND_URL;

  constructor(private storeService: StoreService,private route: ActivatedRoute,private cartService: CartService,) {
    this.route.params.subscribe(params => {
      this.storeService.getProduct(params['id']).subscribe((data) => {
        this.products = data;
      });
    });

  }
  addToCart(product: any) {
    this.cartService.addToCart(product);
    window.location.reload()
  }
  buyWithPoints(){

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      // Access the 'id' parameter
      console.log('Product ID:', params['id']);
    });
  }
}
