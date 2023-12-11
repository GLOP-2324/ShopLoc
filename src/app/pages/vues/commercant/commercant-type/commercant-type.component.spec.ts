import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercantTypeComponent } from './commercant-type.component';

describe('CommercantTypeComponent', () => {
  let component: CommercantTypeComponent;
  let fixture: ComponentFixture<CommercantTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommercantTypeComponent]
    });
    fixture = TestBed.createComponent(CommercantTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
