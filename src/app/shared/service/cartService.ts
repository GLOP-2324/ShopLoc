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
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartItemCount();
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  getCartItems() {
    return [...this.cart];
  }

  removeFromCart(product: any) {
    const index = this.cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.cart.splice(index, 1);
      }

      this.updateCartItemCount();
      this.saveCartToLocalStorage();
    }
  }

  clearCart() {
    this.cart = [];
    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private updateCartItemCount() {
    let totalCount = 0;
    this.cart.forEach((item) => {
      totalCount += item.quantity;
    });
    this.cartItemsSubject.next(totalCount);
  }
}
