import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class BasketComponent implements AfterViewInit  {
  @ViewChild('exampleModal') exampleModal: ElementRef | undefined;
  @ViewChild('exampleModal2') exampleModal2: ElementRef | undefined;
  ngAfterViewInit(): void {

  }
  reduction: Boolean | undefined;
  cartItems: Product[] = [];
  achatsItems:any=[]
  emailUser="";
  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private basketService: BasketService,
              private router:Router,
              private elementRef: ElementRef
              ) {

    // @ts-ignore
    this.emailUser = localStorage.getItem('email');
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems(this.emailUser);
    this.achatsItems = this.cartService.getAchats(this.emailUser)
  }
  removeFromCart(product: any) {
    this.cartService.removeFromCart(product,this.emailUser);

    this.cartItems = this.cartService.getCartItems(this.emailUser);
  }
  validateBasket() {
    const newFormData = new FormData();
    const product = new Product();
    const achat = new Achat();

    // @ts-ignore
    achat.storeId = this.cartItems[0].store.id;
    achat.emailUser = this.emailUser;
    achat.cartItems = this.achatsItems;

    if(this.reduction == true){
      this.basketService.validateBasketFidelitypoints(this.emailUser,achat).subscribe((response: any) => {

        console.log('Success:', response);
        this.toastr.success("Merci pour l'achat");

        this.cartService.clearCart(this.emailUser);
        const modalElement = document.getElementById('exampleModal2');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.setAttribute('aria-modal', 'false');
          modalElement.setAttribute('style', 'display: none');
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        }
        this.router.navigate(['/']);
      }, (error: any) => {
        this.toastr.error("Votre solde est insuffisant, recharger votre carte");
      })
    }
    else{
      this.basketService.validateBasket(this.emailUser,achat).subscribe((response: any) => {

        console.log('Success:', response);
        this.toastr.success("Merci pour l'achat");

        this.cartService.clearCart(this.emailUser);
        const modalElement = document.getElementById('exampleModal2');
        if (modalElement) {
          modalElement.classList.remove('show');
          modalElement.setAttribute('aria-modal', 'false');
          modalElement.setAttribute('style', 'display: none');
          const modalBackdrop = document.querySelector('.modal-backdrop');
          if (modalBackdrop) {
            modalBackdrop.remove();
          }
        }
        this.router.navigate(['/']);
      }, (error: any) => {
        this.toastr.error("Votre solde est insuffisant, recharger votre carte");
      })
    }

  }
  validateBasketByCreditCard() {
    const achat = new Achat();
    // @ts-ignore
    achat.storeId = this.cartItems[0].store.id;
    achat.emailUser = this.emailUser;
    achat.cartItems = this.cartItems;
    console.log(this.cartItems)
    this.basketService.validateBasketByCreditCard(this.emailUser,achat).subscribe((response: any) => {
      console.log('Success:', response);
      this.toastr.success("Merci pour l'achat");


      this.cartService.clearCart(this.emailUser);
      // @ts-ignore
      const modalElement = document.getElementById('exampleModal');
      if (modalElement) {
        modalElement.classList.remove('show');
        modalElement.setAttribute('aria-modal', 'false');
        modalElement.setAttribute('style', 'display: none');
        const modalBackdrop = document.querySelector('.modal-backdrop');
        if (modalBackdrop) {
          modalBackdrop.remove();
        }
      }
      this.router.navigate(['/']);
    }, (error: any) => {
      this.toastr.error("Une erreur s'est produite");
    })
  }
  recharger() {
    const modalElement = document.getElementById('exampleModal2');

    if (modalElement) {
      modalElement.classList.remove('show');
      modalElement.setAttribute('aria-modal', 'false');
      modalElement.setAttribute('style', 'display: none');
      const modalBackdrop = document.querySelector('.modal-backdrop');
      if (modalBackdrop) {
        modalBackdrop.remove();
      }
      this.router.navigate(['/client/Card']);
    }
  }
  Reduction(){
    this.reduction=true;
  }
}
