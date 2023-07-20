import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudEquipmentsComponent } from './hud-equipments.component';

describe('HudEquipmentsComponent', () => {
  let component: HudEquipmentsComponent;
  let fixture: ComponentFixture<HudEquipmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudEquipmentsComponent]
    });
    fixture = TestBed.createComponent(HudEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
