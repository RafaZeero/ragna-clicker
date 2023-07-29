import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapSelectionComponent } from './map-selection.component';

describe(MapSelectionComponent.name, () => {
  let component: MapSelectionComponent;
  let fixture: ComponentFixture<MapSelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapSelectionComponent],
    });
    fixture = TestBed.createComponent(MapSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
