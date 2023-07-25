import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitboxComponent } from './hitbox.component';

describe(HitboxComponent.name, () => {
  let component: HitboxComponent;
  let fixture: ComponentFixture<HitboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HitboxComponent],
    });
    fixture = TestBed.createComponent(HitboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
