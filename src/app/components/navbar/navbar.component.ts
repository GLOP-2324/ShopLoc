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
  wishlistLength: number = 0;
  constructor(private router: Router,private cartService: CartService) {
    // @ts-ignore
    this.cartItems = this.cartService.getCartItems(localStorage.getItem("email"));
    if(localStorage.getItem("firstname")!==null&&localStorage.getItem("lastname")!==null){
      this.loggedInUser=true
    }
    const wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    this.wishlistLength = wishlist.length;
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
  logout() {
    const userEmail = localStorage.getItem("email");
    const userCart = localStorage.getItem(`cart_${userEmail}`);
    const userAchats = localStorage.getItem(`achats_${userEmail}`);
    localStorage.clear();
    // @ts-ignore
    localStorage.setItem(`cart_${userEmail}`, userCart);
    // @ts-ignore
    localStorage.setItem(`achats_${userEmail}`, userAchats);
    this.router.navigate(['/', 'signIn']);
  }

}
