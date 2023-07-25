import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudConfigComponent } from './hud-config.component';

describe(HudConfigComponent.name, () => {
  let component: HudConfigComponent;
  let fixture: ComponentFixture<HudConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudConfigComponent],
    });
    fixture = TestBed.createComponent(HudConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
