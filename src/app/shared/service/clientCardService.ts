import {Injectable} from "@angular/core";
import {Achat} from "../model/Achat";
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ClientCardService {
  constructor(private http: HttpClient) {
  }

  public creditCard(email: string, amount : number) {
    // @ts-ignore
    return this.http.post(`${environment.BACKEND_URL}/client/${email}/card?amount=${amount}`);
  }
  public getFidelityCardMontant(email: string) {
    // @ts-ignore
    return this.http.get(`${environment.BACKEND_URL}/client/${email}/card`);
  }

}
