import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/cartService";
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../../shared/service/SharedService";
import { BasketService } from 'src/app/shared/service/basketService';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  cartItems: any[] = [];
  emailUser="";
  constructor(private cartService: CartService,  private toastr: ToastrService,
  private basketService: BasketService) {
    // @ts-ignore
    this.emailUser = localStorage.getItem('email');
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
  }
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);

    this.cartItems = this.cartService.getCartItems();
  }
  validateBasket() {
    const newFormData = new FormData();
    newFormData.append('store', this.cartItems[0].store.id);
    newFormData.append('client', this.emailUser);
    // @ts-ignore
    newFormData.append('produits', this.cartItems);
    this.basketService.validateBasket(newFormData).subscribe((response: any) => {
      console.log('Success:', response);
      this.toastr.success("Merci pour l'achat");
      this.cartItems =[]
    })

  }
}
