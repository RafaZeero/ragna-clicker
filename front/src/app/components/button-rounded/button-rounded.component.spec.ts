import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRoundedComponent } from './button-rounded.component';

describe(ButtonRoundedComponent.name, () => {
  let component: ButtonRoundedComponent;
  let fixture: ComponentFixture<ButtonRoundedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonRoundedComponent],
    });
    fixture = TestBed.createComponent(ButtonRoundedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
