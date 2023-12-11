import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUtilisateurComponent } from './admin-utilisateur.component';

describe('AdminUtilisateurComponent', () => {
  let component: AdminUtilisateurComponent;
  let fixture: ComponentFixture<AdminUtilisateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUtilisateurComponent]
    });
    fixture = TestBed.createComponent(AdminUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
