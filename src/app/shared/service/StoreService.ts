import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Product} from "../model/Product";
import {TypeProduct} from "../model/TypeProduct";


@Injectable({
  providedIn: 'root',
})
export class StoreService {

  constructor(private http: HttpClient) {
  }
  public getTypeProduct() {
    return this.http.get(environment.BACKEND_URL + '/typeProduct');
  }
  public createProduct(product: Product) {
    return this.http.post(environment.BACKEND_URL + '/product/', product,);
  }
  public createTypeProduct(typeProduct: TypeProduct) {
    return this.http.post(environment.BACKEND_URL + '/typeProduct/', typeProduct);
  }
}
