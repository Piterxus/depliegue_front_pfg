import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilSocioComponent } from './perfil-socio.component';

describe('PerfilSocioComponent', () => {
  let component: PerfilSocioComponent;
  let fixture: ComponentFixture<PerfilSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilSocioComponent]
    });
    fixture = TestBed.createComponent(PerfilSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
