import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasDetalleComponent } from './facturas-detalle.component';

describe('FacturasDetalleComponent', () => {
  let component: FacturasDetalleComponent;
  let fixture: ComponentFixture<FacturasDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasDetalleComponent]
    });
    fixture = TestBed.createComponent(FacturasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
