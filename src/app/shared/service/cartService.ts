// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cart: any[] = [];

  constructor() {
    // Retrieve cart data from localStorage on service initialization
    const storedCart = localStorage.getItem('cart');
    console.log(localStorage,'jeee')
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.cartItemsSubject.next(this.cart.length);
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    const currentCount = this.cartItemsSubject.value;
    this.cartItemsSubject.next(currentCount + quantity);
    this.saveCartToLocalStorage();
    console.log('Updated Cart:', this.cart);
  }

  getCartItems() {
    return [...this.cart];
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(product: any) {
    const index = this.cart.indexOf(product);
    if (index !== -1) {
      this.cart.splice(index, 1);

      const currentCount = this.cartItemsSubject.value;
      this.cartItemsSubject.next(currentCount - 1);

      this.saveCartToLocalStorage();
    }
  }
}
