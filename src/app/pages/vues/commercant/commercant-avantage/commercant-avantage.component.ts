import { Component } from '@angular/core';
import {StoreService} from "../../../../shared/service/StoreService";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../../../shared/service/cartService";
import {Product} from "../../../../shared/model/Product";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-commercant-avantage',
  templateUrl: './commercant-avantage.component.html',
  styleUrls: ['./commercant-avantage.component.css']
})
export class CommercantAvantageComponent {
  form: FormGroup;
  products: any = [];
  store :any;

  constructor(private storeService: StoreService, private route: ActivatedRoute, private cartService: CartService, private fb: FormBuilder) {
    const email = localStorage.getItem('email');
    this.form = this.fb.group({
      avantages: false,
      nbPoints: 0
    });
    if (email) {
      this.storeService.findSToreByEmail(email).subscribe(
        (store: any) => {
          this.store = store.id;
          // @ts-ignore
          this.storeService.getProduct(store.id).subscribe((products: Product[]) => {
            this.products = products;
          });

        })

    }

  }

  onSubmit() {
    // @ts-ignore
    const avantages = this.form.get('avantages').value;
    // @ts-ignore
    const nbPoints = this.form.get('nbPoints').value;


    // @ts-ignore
    const productId = this.form.get('productId').value;

    const newFormData = new FormData();

    newFormData.append('avantage', avantages);
    newFormData.append('point', nbPoints);
    newFormData.append('store',  this.store);
    newFormData.append('id', productId);


    // this.storeService.createProduct(newFormData).subscribe((response: any) => {
    //   console.log('Success:', response);
    // });
  }

}
