import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../shared/service/StoreService';
import { SharedService } from "../../shared/service/SharedService";
import { CartService } from "../../shared/service/cartService";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  store: any = [];
  storeSets: any[] = [];
  filteredStoreSets: any[] = [];
  searchTerm: string = '';
  isCartEmpty: boolean = true;

  constructor(
    private storeService: StoreService,
    private sharedService: SharedService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.storeService.getStore().subscribe((data: any) => {
      this.store = data;
      this.groupItems();
      this.updateCartState();
      this.filteredStoreSets = this.storeSets.map(set =>
        set.map((item:any) => ({
          ...item,
          isFavorite: this.isInWishlist(item.id)
        }))
      );
    });

    this.sharedService.getCurrentObject().subscribe((searchTerm: string) => {
      if (searchTerm) {
        this.searchTerm = searchTerm;
        this.filterStoreSets(searchTerm);
      } else {
        this.storeService.getStore().subscribe((data) => {
          this.store = data;
          this.groupItems();
          this.updateCartState();
          this.filteredStoreSets = this.storeSets.map(set =>
            set.map((item:any) => ({
              ...item,
              isFavorite: this.isInWishlist(item.id)
            }))
          );
        });
      }
    });
  }



  updateCartState() {
    // @ts-ignore
    this.isCartEmpty = this.cartService.isCartEmpty(localStorage.getItem("email"));
    if (this.isCartEmpty) {
      // Activer tous les boutons si le panier est vide
      this.store.forEach((store: { disabled: boolean; }) => {
        store.disabled = false;
      });
    } else {
      // Désactiver les boutons des magasins qui ne sont pas dans le panier
      // @ts-ignore
      const storeIdsInCart = this.cartService.getCartItems(localStorage.getItem("email")).map((item: { store: any; }) => item.store.id);
      this.store.forEach((store: { id: any; disabled: boolean; }) => {
        store.disabled = !storeIdsInCart.includes(store.id);
      });
    }
  }

  filterStoreSets(searchTerm: string) {
    if (!searchTerm) {
      this.filteredStoreSets = [...this.storeSets];
    } else {
      this.filteredStoreSets = this.storeSets.filter(set =>
        set.some((item: { name: string; }) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      const filteredItems = this.filteredStoreSets
        .map(set => set.filter((item: { name: string; }) => item.name.toLowerCase().includes(searchTerm.toLowerCase())))
        .reduce((acc, val) => acc.concat(val), []);
      this.filteredStoreSets = [filteredItems];
    }
  }

  private groupItems() {
    this.storeSets = [];
    for (let i = 0; i < this.store.length; i += 3) {
      this.storeSets.push(this.store.slice(i, i + 3));
    }
  }

  toggleHeart(item: any) {
    const wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const index = wishlist.indexOf(item.id);
    if (index !== -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(item.id);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    item.isFavorite = wishlist.includes(item.id);
    const heartIcon = document.getElementById(`heart-icon-${item.id}`);
    if (heartIcon) {
      if (item.isFavorite) {
        heartIcon.classList.add('filled-heart');
      } else {
        heartIcon.classList.remove('filled-heart');
      }
    }
    window.location.reload()
  }

  isInWishlist(itemId: number): boolean {
    const wishlist: number[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return wishlist.includes(itemId);
  }

}
