import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercantAvantageComponent } from './commercant-avantage.component';

describe('CommercantAvantageComponent', () => {
  let component: CommercantAvantageComponent;
  let fixture: ComponentFixture<CommercantAvantageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommercantAvantageComponent]
    });
    fixture = TestBed.createComponent(CommercantAvantageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
