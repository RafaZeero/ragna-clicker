import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonsterComponent } from './monster.component';

describe(MonsterComponent.name, () => {
  let component: MonsterComponent;
  let fixture: ComponentFixture<MonsterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MonsterComponent],
    });
    fixture = TestBed.createComponent(MonsterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
