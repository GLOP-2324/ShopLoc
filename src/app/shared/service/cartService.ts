import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: any, userEmail: string, quantity: number = 1) {
    const userCart = this.loadCartFromLocalStorage(userEmail);
    const existingProductIndex = userCart.findIndex((item) => item.id === product.id);

    // Récupérer checkedItems du localStorage et le convertir en tableau
    let checkedItems: any[] = [];
    const checkedItemsString = localStorage.getItem('checkedItems');
    if (checkedItemsString) {
      checkedItems = JSON.parse(checkedItemsString);
    }

    // Vérifier si le produit est présent dans checkedItems
    const checkedProductIndex = checkedItems.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      userCart[existingProductIndex].quantity += quantity;
    } else {
      userCart.push({ ...product, quantity });
    }

    // Si le produit est également présent dans checkedItems, ajouter la quantité spécifiée
    if (checkedProductIndex !== -1) {
      checkedItems[checkedProductIndex].quantity += quantity;
      localStorage.setItem('checkedItems', JSON.stringify(checkedItems)); // Mettre à jour checkedItems dans le localStorage
    }

    this.updateCartItemCount(userCart);
    this.addToCartForAchat(product, userEmail);
    this.saveCartToLocalStorage(userCart, userEmail);
  }

  addToCartForAchat(product: any, userEmail: string) {
    let userAchats = this.loadAchatsFromLocalStorage(userEmail);
    if (!userAchats) {
      userAchats = []; // Initialize userAchats to an empty array if it's null
    }
    userAchats.push(product);
    this.saveAchatsToLocalStorage(userAchats, userEmail);
  }


  getCartItems(userEmail: string) {
    return this.loadCartFromLocalStorage(userEmail);

  }

  getAchats(userEmail: string) {
    return this.loadAchatsFromLocalStorage(userEmail);
  }

  removeFromCart(product: any, userEmail: string) {
    this.removeFromAchats(product, userEmail);


    const userCart = this.loadCartFromLocalStorage(userEmail);
    const index = userCart.findIndex((item) => item.id === product.id);

    if (index !== -1) {
      if (userCart[index].quantity > 1) {
        userCart[index].quantity--;
      } else {
        userCart.splice(index, 1);
      }

      this.updateCartItemCount(userCart);
      this.saveCartToLocalStorage(userCart, userEmail);
      window.location.reload();
    }

    // Récupérer checkedItems du localStorage et le convertir en tableau
    let checkedItems: any[] = [];
    const checkedItemsString = localStorage.getItem('checkedItems');
    if (checkedItemsString) {
      checkedItems = JSON.parse(checkedItemsString);
    }

    // Vérifier si le produit est présent dans checkedItems
    const checkedProductIndex = checkedItems.findIndex(item => item.id === product.id);

    // Si le produit est présent dans checkedItems, diminuer la quantité
    if (checkedProductIndex !== -1) {
      if (checkedItems[checkedProductIndex].quantity > 1) {
        checkedItems[checkedProductIndex].quantity--;
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems)); // Mettre à jour checkedItems dans le localStorage
      } else {
        checkedItems.splice(checkedProductIndex, 1); // Supprimer le produit de checkedItems si la quantité est de 1
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems)); // Mettre à jour checkedItems dans le localStorage
      }
    }
  }

  removeFromCheckedItems(product: any) {
    const userAchatsString = localStorage.getItem("checkedItems");
    if (userAchatsString) {
      const userAchats: any[] = JSON.parse(userAchatsString);
      const index = userAchats.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        userAchats.splice(index, 1);
        localStorage.setItem("checkedItems", JSON.stringify(userAchats));
      }
    }
  }
  removeFromAchats(product: any, userEmail: string) {
    const userAchats = this.loadAchatsFromLocalStorage(userEmail);
    const index = userAchats.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      userAchats.splice(index, 1);
      this.saveAchatsToLocalStorage(userAchats, userEmail);
    }
  }

  clearCart(userEmail: string) {
    // @ts-ignore
    localStorage.setItem(`cart_${userEmail}`,[]);
    // @ts-ignore
    localStorage.removeItem(`achats_${userEmail}`,[]);
    this.updateCartItemCount([]);
    this.cartItemsSubject.next(0);
  }
  isCartEmpty(userEmail:string): boolean {
    const cartItems = this.getCartItems(userEmail);
    return cartItems.length === 0;
  }

  private loadCartFromLocalStorage(userEmail: string): any[] {
    const storedCart = localStorage.getItem(`cart_${userEmail}`);
    // @ts-ignore
    return storedCart ? JSON.parse(storedCart) : [];

  }

  private saveCartToLocalStorage(cart: any[], userEmail: string) {
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
  }

  private loadAchatsFromLocalStorage(userEmail: string): any[] {
    const storedAchats = localStorage.getItem(`achats_${userEmail}`);
    return storedAchats ? JSON.parse(storedAchats) : [];
  }

  private saveAchatsToLocalStorage(achats: any[], userEmail: string) {
    localStorage.setItem(`achats_${userEmail}`, JSON.stringify(achats));
  }

  private updateCartItemCount(cart: any[]) {
    let totalCount = 0;
    cart.forEach((item) => {
      totalCount += item.quantity;
    });
    this.cartItemsSubject.next(totalCount);
  }
}
