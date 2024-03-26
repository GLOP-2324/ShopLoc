import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CartService} from "../../shared/service/cartService";
import {ToastrService} from "ngx-toastr";
import {SharedService} from "../../shared/service/SharedService";
import { BasketService } from 'src/app/shared/service/basketService';
import {Product} from "../../shared/model/Product";
import {Achat} from "../../shared/model/Achat";
import {Router} from "@angular/router";
import {ClientCardService} from "../../shared/service/clientCardService";

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
  fidelityPoints:any;
  reduction: Boolean | undefined;
  cartItems: Product[] = [];
  achatsItems:any=[]
  emailUser="";
  checkedItems: any[] = [];
  isButtonDisabled: boolean = true;
  constructor(private cartService: CartService,
              private toastr: ToastrService,
              private basketService: BasketService,
              private router:Router,
              private elementRef: ElementRef,
              private clientCardService:ClientCardService
              ) {
    const checkedItems = localStorage.getItem('checkedItems');
    if (checkedItems) {
      this.checkedItems = JSON.parse(checkedItems);
      this.isButtonDisabled = this.checkedItems.length < 1;
    }
    // @ts-ignore
    this.emailUser = localStorage.getItem('email');
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems(this.emailUser);
    this.achatsItems = this.cartService.getAchats(this.emailUser)
    const checkedItems = localStorage.getItem('checkedItems');
    if (checkedItems) {
      this.checkedItems = JSON.parse(checkedItems);
    }
    // @ts-ignore
    this.clientCardService.getFidelityPoints(localStorage.getItem("email")).subscribe((points) => {
      this.fidelityPoints = points;
      console.log(points)
    })
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
      this.basketService.validateBasketFidelityCard(this.emailUser,achat).subscribe((response: any) => {

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
    achat.cartItems = this.achatsItems;
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
  onCheckboxChange(event: any, product: Product) {
    const isChecked = event.target.checked;

    if (product.benefitsActivated) {
      if (isChecked) {
        if (!this.checkedItems.find(item => item.id === product.id)) {
          this.checkedItems.push(product);
          console.log(this.checkedItems, 'checked');
          this.isButtonDisabled = this.checkedItems.length < 1;
        }
      } else {
        const index = this.checkedItems.findIndex(item => item.id === product.id);
        if (index !== -1) {
          this.checkedItems.splice(index, 1);
          console.log(this.checkedItems, 'unchecked');
          this.isButtonDisabled = this.checkedItems.length < 1;
        }
      }

      localStorage.setItem('checkedItems', JSON.stringify(this.checkedItems));
    }
  }

  validateBasketByFidelityPoints(){
    const achat = new Achat();
    // @ts-ignore
    achat.storeId = this.checkedItems[0].store.id;
    achat.emailUser = this.emailUser;
    achat.cartItems = this.checkedItems.flatMap(item => Array.from({ length: item.quantity }, () => ({ ...item })));

    // Supprimer la clé 'quantité' de chaque produit dans la nouvelle liste
    achat.cartItems.forEach(item => delete item.quantity);
    console.log(achat.cartItems,'kkkkkkkkkkkkkk')
    let points = 0;

    if (points <= this.fidelityPoints) {
      this.basketService.validateBasketFidelitypoints(this.emailUser, achat).subscribe((response) => {
        this.achatsItems.forEach((achatItem: Achat) => {
          const index = this.checkedItems.findIndex(item => item.id === achatItem.id);
          if (index !== -1) {
            this.cartService.removeFromCart(achatItem, this.emailUser);
            points += this.checkedItems[index].points;
          }
        });
        this.toastr.success("Merci pour l'achat");
      }, (error) => {
        this.toastr.error("Une erreur s'est produite lors de la validation du panier de points de fidélité");
      });
    } else {
      this.toastr.error("Vous n'avez pas assez de points");
    }
  }
  isChecked(product: Product): boolean {
    return this.checkedItems.some(item => item.id === product.id);
  }




}
