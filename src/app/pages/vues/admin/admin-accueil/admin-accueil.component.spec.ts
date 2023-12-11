import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccueilComponent } from './admin-accueil.component';

describe('AdminAccueilComponent', () => {
  let component: AdminAccueilComponent;
  let fixture: ComponentFixture<AdminAccueilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAccueilComponent]
    });
    fixture = TestBed.createComponent(AdminAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
