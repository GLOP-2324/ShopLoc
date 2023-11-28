import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommercantsProduitsComponent } from './commercants-produits.component';

describe('CommercantsProduitsComponent', () => {
  let component: CommercantsProduitsComponent;
  let fixture: ComponentFixture<CommercantsProduitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommercantsProduitsComponent]
    });
    fixture = TestBed.createComponent(CommercantsProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
