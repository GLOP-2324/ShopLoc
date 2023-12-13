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
  public findSToreByEmail(email:string) {
    return this.http.get(`${environment.BACKEND_URL}/store/email/${email}`);
}

  public getTypeProductById(id:number) {
    return this.http.get(`${environment.BACKEND_URL}/typeProduct/${id}`);
  }
  public getTypeProduct() {
    return this.http.get(environment.BACKEND_URL + '/typeProduct/');
  }
  public getProduct(id:number) {
    return this.http.get(`${environment.BACKEND_URL}/product/allProducts/${id}`);
  }
  public createProduct(product: FormData) {
    return this.http.post(environment.BACKEND_URL + '/product/', product,);
  }
  public createTypeProduct(typeProduct: TypeProduct) {
    return this.http.post(environment.BACKEND_URL + '/typeProduct/', typeProduct);
  }
  public getStore() {
    return this.http.get(environment.BACKEND_URL + '/store/');
  }
}
