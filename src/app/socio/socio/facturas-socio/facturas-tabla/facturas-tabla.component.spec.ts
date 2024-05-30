import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasTablaComponent } from './facturas-tabla.component';

describe('FacturasTablaComponent', () => {
  let component: FacturasTablaComponent;
  let fixture: ComponentFixture<FacturasTablaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasTablaComponent]
    });
    fixture = TestBed.createComponent(FacturasTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
