import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudCharComponent } from './hud-char.component';

describe(HudCharComponent.name, () => {
  let component: HudCharComponent;
  let fixture: ComponentFixture<HudCharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudCharComponent],
    });
    fixture = TestBed.createComponent(HudCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
