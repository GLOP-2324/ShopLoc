import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAvantagesComponent } from './client-avantages.component';

describe('ClientAvantagesComponent', () => {
  let component: ClientAvantagesComponent;
  let fixture: ComponentFixture<ClientAvantagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAvantagesComponent]
    });
    fixture = TestBed.createComponent(ClientAvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
