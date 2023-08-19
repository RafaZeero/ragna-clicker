import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject, Input } from '@angular/core';
import { RippleDirective } from '../../directive';

/**
 * Add more style options here, the `none` is for no styles besides the default
 * to be applied.
 */
type ActionStyle = 'primary' | 'secondary' | 'tertiary' | 'none';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[rag-action], button[rag-action]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RippleDirective],
})
export class ActionComponent {
  private readonly _rippleDirective = inject(RippleDirective);

  private _actionStyle: ActionStyle = 'primary';

  // #region Action Inputs
  @Input()
  public set actionStyle(value: ActionStyle) {
    this._actionStyle = value;
  }
  // #endregion

  // #region Ripple Inputs
  @Input()
  public set rippleDisabled(value: boolean) {
    this._rippleDirective.rippleDisabled = value;
  }

  @Input()
  public set rippleCentered(value: boolean) {
    this._rippleDirective.rippleCentered = value;
  }

  @Input()
  public set rippleColor(value: string) {
    this._rippleDirective.rippleColor = value;
  }
  // #endregion

  @HostBinding('class')
  public get actionClass(): string {
    return `uv-action-${this._actionStyle}`;
  }

  constructor() {
    this._setUpRippleDefaults();
  }

  /**
   * Sets up the default values for the ripple directive.
   *
   * Only works on the `constructor`, otherwise it will override the component's
   * inputs.
   *
   * Please do not forget to handle all {@link ActionComponent._actionStyle}
   * cases.
   */
  private _setUpRippleDefaults(): void {
    // Default values should be set before the switch statement.
    this._rippleDirective.rippleDisabled = true;

    const actionStyle: ActionStyle = this._actionStyle;
    switch (actionStyle) {
      case 'primary':
      case 'secondary':
      case 'tertiary':
        this._rippleDirective.rippleDisabled = false;
        return;
      case 'none':
        return;
      default:
        this._exaustiveSwitchCheck(actionStyle);
    }
  }

  /**
   * Used to ensure that all cases are handled in a switch statement. Call it
   * after the default case.
   *
   * @param value - The switch value.
   */
  private _exaustiveSwitchCheck = (_value: never): void => {
    // eslint-disable-next-line functional/no-throw-statements
    throw new Error('Oops, someone forgot to handle all the switch cases!');
  };
}
