import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEquipmentsComponent } from './player-equipments.component';

describe(PlayerEquipmentsComponent.name, () => {
  let component: PlayerEquipmentsComponent;
  let fixture: ComponentFixture<PlayerEquipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PlayerEquipmentsComponent],
    });
    fixture = TestBed.createComponent(PlayerEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
