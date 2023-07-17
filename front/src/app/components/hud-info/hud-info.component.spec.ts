import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudInfoComponent } from './hud-info.component';

describe(HudInfoComponent.name, () => {
  let component: HudInfoComponent;
  let fixture: ComponentFixture<HudInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudInfoComponent],
    });
    fixture = TestBed.createComponent(HudInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
