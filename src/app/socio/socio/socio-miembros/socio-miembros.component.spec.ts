import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioMiembrosComponent } from './socio-miembros.component';

describe('SocioMiembrosComponent', () => {
  let component: SocioMiembrosComponent;
  let fixture: ComponentFixture<SocioMiembrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocioMiembrosComponent]
    });
    fixture = TestBed.createComponent(SocioMiembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
