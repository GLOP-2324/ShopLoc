import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountLoginComponent } from './account-login.component';

describe('AccountLoginComponent', () => {
  let component: AccountLoginComponent;
  let fixture: ComponentFixture<AccountLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountLoginComponent]
    });
    fixture = TestBed.createComponent(AccountLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
