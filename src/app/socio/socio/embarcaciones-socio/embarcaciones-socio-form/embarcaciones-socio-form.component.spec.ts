import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbarcacionesSocioFormComponent } from './embarcaciones-socio-form.component';

describe('EmbarcacionesSocioFormComponent', () => {
  let component: EmbarcacionesSocioFormComponent;
  let fixture: ComponentFixture<EmbarcacionesSocioFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmbarcacionesSocioFormComponent]
    });
    fixture = TestBed.createComponent(EmbarcacionesSocioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
