import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerSkillsComponent } from './player-skills.component';

describe(PlayerSkillsComponent.name, () => {
  let component: PlayerSkillsComponent;
  let fixture: ComponentFixture<PlayerSkillsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlayerSkillsComponent],
    });
    fixture = TestBed.createComponent(PlayerSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
