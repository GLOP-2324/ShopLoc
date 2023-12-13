import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAccueilComponent } from './client-accueil.component';

describe('ClientAccueilComponent', () => {
  let component: ClientAccueilComponent;
  let fixture: ComponentFixture<ClientAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAccueilComponent]
    });
    fixture = TestBed.createComponent(ClientAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
