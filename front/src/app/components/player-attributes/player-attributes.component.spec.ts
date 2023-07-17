import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerAttributesComponent } from './player-attributes.component';

describe('PlayerAttributesComponent', () => {
  let component: PlayerAttributesComponent;
  let fixture: ComponentFixture<PlayerAttributesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlayerAttributesComponent]
    });
    fixture = TestBed.createComponent(PlayerAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
