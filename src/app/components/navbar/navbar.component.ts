import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../../shared/service/cartService";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItems: any[] = [];
  protected readonly localStorage = localStorage;
  loggedInUser=false;
  constructor(private router: Router,private cartService: CartService) {
    this.cartItems = this.cartService.getCartItems();
    if(localStorage.getItem("firstname")!==null&&localStorage.getItem("lastname")!==null){
      this.loggedInUser=true
    }

  }

  login() {
    this.router.navigate(['/', 'signIn']);
  }
  panier() {
    this.router.navigate(['/', 'panier']);
  }
  goToAccount(){
    // @ts-ignore
    if(localStorage.getItem("roleId")== 1){
      this.router.navigate(['/', 'admin']);
    }

    // @ts-ignore
    if(localStorage.getItem("roleId")  == 2){

      this.router.navigate(['/', 'commercant']);
    }

    else{
      this.router.navigate(['/', 'client']);
    }
  }

}
