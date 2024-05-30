import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmarresFormComponent } from './amarres-form.component';

describe('AmarresFormComponent', () => {
  let component: AmarresFormComponent;
  let fixture: ComponentFixture<AmarresFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmarresFormComponent]
    });
    fixture = TestBed.createComponent(AmarresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
