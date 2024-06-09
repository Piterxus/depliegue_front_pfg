import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipAnimationComponent } from './ship-animation.component';

describe('ShipAnimationComponent', () => {
  let component: ShipAnimationComponent;
  let fixture: ComponentFixture<ShipAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipAnimationComponent]
    });
    fixture = TestBed.createComponent(ShipAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
