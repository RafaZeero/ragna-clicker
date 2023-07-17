import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudAttributesComponent } from './hud-attributes.component';

describe(HudAttributesComponent.name, () => {
  let component: HudAttributesComponent;
  let fixture: ComponentFixture<HudAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudAttributesComponent],
    });
    fixture = TestBed.createComponent(HudAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
