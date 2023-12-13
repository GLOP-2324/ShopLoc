import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/cartService";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);

    this.cartItems = this.cartService.getCartItems();
  }
}
