import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Account} from "../model/Account";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private http: HttpClient) {
  }

  public validateBasket(formdata:FormData) {
    return this.http.post(environment.BACKEND_URL + '/achat/', formdata,);
  }

}
