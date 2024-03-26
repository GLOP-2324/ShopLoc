import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Account} from "../model/Account";
import {Achat} from "../model/Achat";

@Injectable({
  providedIn: 'root',
})
export class BasketService {

  constructor(private http: HttpClient) {
  }

  public validateBasket(email: string, achat : Achat) {

    return this.http.post(`${environment.BACKEND_URL}/client/${email}/card`, achat);

  }
  public validateBasketFidelityCard(email: string, achat : Achat) {
    buyWithfidelityPoints:true
    return this.http.patch(`${environment.BACKEND_URL}/client/${email}/card?buyWithfidelityPoints=false`, achat);

  }
  public validateBasketFidelitypoints(email: string, achat : Achat) {
    buyWithfidelityPoints:true
    return this.http.post(`${environment.BACKEND_URL}/client/${email}/card?buyWithfidelityPoints=true`, achat);

  }
  public validateBasketByCreditCard(email: string, achat : Achat) {

    return this.http.post(`${environment.BACKEND_URL}/client/${email}/card?creditCard=true`, achat);

  }
}
