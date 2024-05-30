import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcacionesSocioComponent } from './embarcaciones-socio.component';

describe('EmbarcacionesSocioComponent', () => {
  let component: EmbarcacionesSocioComponent;
  let fixture: ComponentFixture<EmbarcacionesSocioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbarcacionesSocioComponent]
    });
    fixture = TestBed.createComponent(EmbarcacionesSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
