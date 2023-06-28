import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponCompareComponent } from './weapon-compare.component';

describe('WeaponCompareComponent', () => {
  let component: WeaponCompareComponent;
  let fixture: ComponentFixture<WeaponCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeaponCompareComponent]
    });
    fixture = TestBed.createComponent(WeaponCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
