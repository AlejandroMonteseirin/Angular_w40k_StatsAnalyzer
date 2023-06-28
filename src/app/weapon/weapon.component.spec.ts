import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponComponent } from './weapon.component';

describe('WeaponComponent', () => {
  let component: WeaponComponent;
  let fixture: ComponentFixture<WeaponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeaponComponent]
    });
    fixture = TestBed.createComponent(WeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
