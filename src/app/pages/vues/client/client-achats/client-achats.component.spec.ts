import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAchatsComponent } from './client-achats.component';

describe('ClientAchatsComponent', () => {
  let component: ClientAchatsComponent;
  let fixture: ComponentFixture<ClientAchatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientAchatsComponent]
    });
    fixture = TestBed.createComponent(ClientAchatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
