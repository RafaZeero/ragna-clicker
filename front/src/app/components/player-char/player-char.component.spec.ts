import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCharComponent } from './player-char.component';

describe(PlayerCharComponent.name, () => {
  let component: PlayerCharComponent;
  let fixture: ComponentFixture<PlayerCharComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlayerCharComponent],
    });
    fixture = TestBed.createComponent(PlayerCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
