// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private currentObjectSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setCurrentObject(object: any): void {
    this.currentObjectSubject.next(object);
  }

  getCurrentObject(): Observable<any> {
    return this.currentObjectSubject.asObservable();
  }
}
