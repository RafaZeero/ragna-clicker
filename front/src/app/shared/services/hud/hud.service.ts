import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { DEFAULT_HUD, INITIAL_POSITION } from '@shared/constants';
import { HudControl, HudInitPosition } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class HudService {
  private _hudControl$ = new BehaviorSubject<HudControl>(DEFAULT_HUD);
  public hudControl$ = this._hudControl$.asObservable().pipe(shareReplay());

  private _saveHudPositioning$ = new BehaviorSubject<HudInitPosition>(INITIAL_POSITION);
  public saveHudPositioning$ = this._saveHudPositioning$.asObservable();

  public get hudControlValue() {
    return this._hudControl$.getValue();
  }

  public get hudPositioningValue() {
    return this._saveHudPositioning$.getValue();
  }

  public controlPlayerHud(hudToToggle: keyof Partial<HudControl>) {
    const choosedControl = hudToToggle;

    // Get current value
    const currentControlValue = this._hudControl$.getValue();

    // Updated control
    const updatedControlValue = !currentControlValue[choosedControl];

    // Toggle value
    const updatedValue = { ...currentControlValue, [choosedControl]: updatedControlValue };

    // Update value
    this._hudControl$.next(updatedValue);
  }

  public saveHudPosition(newPosition: Partial<HudInitPosition>) {
    const currentHudsPositioning = this._saveHudPositioning$.getValue();
    this._saveHudPositioning$.next({ ...currentHudsPositioning, ...newPosition });
  }

  public resetHudPosition() {
    this._saveHudPositioning$.next(INITIAL_POSITION);
  }
}
