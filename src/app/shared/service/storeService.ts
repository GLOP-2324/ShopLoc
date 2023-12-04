import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Account} from "../model/Account";

@Injectable()
export class storeService {

  constructor(private http: HttpClient) {
  }


  public createAccount(store: Store) {
    return this.http.post(environment.BACKEND_URL + '/account/', account);
  }
}
