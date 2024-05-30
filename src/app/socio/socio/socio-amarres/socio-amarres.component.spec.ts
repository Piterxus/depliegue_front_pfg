import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocioAmarresComponent } from './socio-amarres.component';

describe('SocioAmarresComponent', () => {
  let component: SocioAmarresComponent;
  let fixture: ComponentFixture<SocioAmarresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocioAmarresComponent]
    });
    fixture = TestBed.createComponent(SocioAmarresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
