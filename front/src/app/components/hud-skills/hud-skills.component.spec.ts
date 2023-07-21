import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudSkillsComponent } from './hud-skills.component';

describe(HudSkillsComponent.name, () => {
  let component: HudSkillsComponent;
  let fixture: ComponentFixture<HudSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudSkillsComponent],
    });
    fixture = TestBed.createComponent(HudSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
