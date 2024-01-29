import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environment/environment";
import {Product} from "../model/Product";
import {TypeProduct} from "../model/TypeProduct";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  processPayment(paymentDetails: any): Observable<any> {
    return this.http.post(`${environment.BACKEND_URL}/payment/process`, paymentDetails);
  }

  getPaymentDetails(paymentId: string): Observable<any> {
    return this.http.get(`${environment.BACKEND_URL}/payment/details/${paymentId}`);
  }

  initiateRefund(paymentId: string): Observable<any> {
    return this.http.post(`${environment.BACKEND_URL}/payment/refund`, { paymentId });
  }

  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.BACKEND_URL}/payments`);
  }
}
