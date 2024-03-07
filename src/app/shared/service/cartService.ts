import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  private cart: any[] = [];
  private achats: any[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartItemCount();
    }

    const storedAchats = localStorage.getItem('achats');
    if (storedAchats) {
      this.achats = JSON.parse(storedAchats);
    }
  }

  addToCart(product: any, quantity: number = 1) {
    const existingProductIndex = this.cart.findIndex((item) => item.id === product.id);
    this.addToCartForAchat(product);
    if (existingProductIndex !== -1) {
      this.cart[existingProductIndex].quantity += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }

    this.updateCartItemCount();
    this.saveCartToLocalStorage();
  }

  addToCartForAchat(product: any) {
    this.achats.push(product);
    this.saveAchatsToLocalStorage();
  }

  getCartItems() {
    return [...this.cart];
  }

  getAchats() {
    return [...this.achats];
  }

  removeFromCart(product: any) {
    this.removeFromAchats(product);
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

  removeFromAchats(product: any) {
    const index = this.achats.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.achats.splice(index, 1);
      this.saveAchatsToLocalStorage();
    }
  }

  clearCart() {
    this.cart = [];
    this.achats=[]
    this.updateCartItemCount();
    this.saveCartToLocalStorage();
    this.saveAchatsToLocalStorage();
  }

  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));

  }

  private saveAchatsToLocalStorage() {
    localStorage.setItem('achats', JSON.stringify(this.achats));
  }

  private updateCartItemCount() {
    let totalCount = 0;
    this.cart.forEach((item) => {
      totalCount += item.quantity;
    });
    this.cartItemsSubject.next(totalCount);
  }
}
