import {Injectable} from "@angular/core";
import {Achat} from "../model/Achat";
import {environment} from "../../../environment/environment";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {
  }

  public getHistoriqueAchat(clientEmail: string) {
    return this.http.get(`${environment.BACKEND_URL}/historique/${clientEmail}`);
  }
  public chooseClientAdvantage(clientEmail: string, avantage: number) {
    const params = new HttpParams().set('avantage', avantage.toString());

    return this.http.put(`${environment.BACKEND_URL}/client/${clientEmail}`, null, { params });
  }


}
