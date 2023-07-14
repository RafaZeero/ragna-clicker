import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HudComponent } from './hud.component';

describe('HudComponent', () => {
  let component: HudComponent;
  let fixture: ComponentFixture<HudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HudComponent]
    });
    fixture = TestBed.createComponent(HudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
