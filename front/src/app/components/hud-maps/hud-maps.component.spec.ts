import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudMapsComponent } from './hud-maps.component';

describe(HudMapsComponent.name, () => {
  let component: HudMapsComponent;
  let fixture: ComponentFixture<HudMapsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudMapsComponent],
    });
    fixture = TestBed.createComponent(HudMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
