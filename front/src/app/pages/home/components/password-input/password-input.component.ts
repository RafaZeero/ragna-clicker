import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, DestroyRef, forwardRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { isString } from 'lodash-es';
import type { Observable } from 'rxjs';
import { BehaviorSubject, map, share } from 'rxjs';
import { IconComponent } from '../icon';
import { IconID } from '@shared/models';
import { ICON_ID } from '@shared/constants';

@Component({
  selector: 'rag-password-input',
  standalone: true,
  imports: [CommonModule, IconComponent, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordFieldComponent,
      multi: true,
    },
  ],
})
export class PasswordFieldComponent implements ControlValueAccessor, Validator, OnInit {
  private readonly _destroyRef = inject(DestroyRef);

  @Input() public placeholder = '';
  @Input() public isValidationError = false;

  /** Internal password FormControl to control the password input value */
  public passwordControl = new FormControl('');

  /** Emits boolean that determines if the password should be shown */
  private readonly _showPassword$ = new BehaviorSubject(false);
  public readonly showPassword$ = this._showPassword$.asObservable();

  /**
   * Emits the ID of the icon of the password visibility button, so that we can
   * change its icon when the visibility is toggled
   */
  public readonly passwordVisibilityIconId$: Observable<IconID> = this.showPassword$.pipe(
    map(shouldShowPassword => (shouldShowPassword ? ICON_ID.visibility_on_filled : ICON_ID.visibility_off)),
    share(),
  );

  public ngOnInit(): void {
    // When the internal passwordControl value changes, also call the control value accessor onChange
    this.passwordControl.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(password => {
      this._onChange(password);
      this._onTouched();
    });
  }

  // * Control value accessor methods

  /* Control value accessor methods */
  public writeValue(value: string | null): void {
    if (isString(value)) {
      this.passwordControl.setValue(value);
    }
  }

  private _onChange = (_value: string | null): void => void 0;
  public registerOnChange(onChange: (value: string | null) => void): void {
    this._onChange = onChange;
  }

  private _onTouched = (): void => void 0;
  public registerOnTouched(onTouched: () => void): void {
    this._onTouched = onTouched;
  }

  public validate(_control: AbstractControl<unknown, unknown>): ValidationErrors | null {
    return this.passwordControl.errors;
  }

  // * Helpers

  /** Is called when we click the button to toggle the password visibility */
  public togglePasswordVisibility = (): void => {
    this._showPassword$.next(!this._showPassword$.value);
  };

  /**
   * Basic function to keep track of items in the iterable for Angular to
   * perform correct DOM updates
   *
   * @param index - The index of the item in the iterable
   */
  public trackByFn = (index: number): number => index;
}
