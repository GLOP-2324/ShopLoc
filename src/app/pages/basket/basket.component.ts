import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/cartService";
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../../shared/service/SharedService";
import { BasketService } from 'src/app/shared/service/basketService';
import {Product} from "../../shared/model/Product";
import {Achat} from "../../shared/model/Achat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  cartItems: Product[] = [];
  emailUser="";
  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private basketService: BasketService,
              private router:Router) {
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
    const product = new Product();
    const achat = new Achat();
    // @ts-ignore
    achat.storeId = this.cartItems[0].store.id;
    achat.emailUser = this.emailUser;
    achat.cartItems = this.cartItems;
    this.basketService.validateBasket(this.emailUser,achat).subscribe((response: any) => {
      console.log('Success:', response);
      this.toastr.success("Merci pour l'achat");
      this.cartItems =[]
    })
  }
  recharger(){
    this.router.navigate(['/client/Card']);
    window.location.reload()
}
}
