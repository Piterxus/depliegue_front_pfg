import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasSocioComponent } from './facturas-socio.component';

describe('FacturasSocioComponent', () => {
  let component: FacturasSocioComponent;
  let fixture: ComponentFixture<FacturasSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacturasSocioComponent]
    });
    fixture = TestBed.createComponent(FacturasSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
