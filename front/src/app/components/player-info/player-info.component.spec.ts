import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerInfoComponent } from './player-info.component';

describe(PlayerInfoComponent.name, () => {
  let component: PlayerInfoComponent;
  let fixture: ComponentFixture<PlayerInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlayerInfoComponent],
    });
    fixture = TestBed.createComponent(PlayerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
