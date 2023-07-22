import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { DEFAULT_HUD } from '@shared/constants';
import { HudControl } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class HudService {
  private _hudControl$ = new BehaviorSubject<HudControl>(DEFAULT_HUD);
  public hudControl$ = this._hudControl$.asObservable().pipe(shareReplay());

  public get hudControlValue() {
    return this._hudControl$.getValue();
  }

  public controlPlayerHud(hudToToggle: keyof Partial<HudControl>) {
    const choosedControl = hudToToggle;

    // Get current value
    const currentControlValue = this._hudControl$.getValue();

    // Toggle value
    const updatedValue = { ...currentControlValue, [choosedControl]: !currentControlValue[choosedControl] };

    // Update value
    this._hudControl$.next(updatedValue);
  }
}
