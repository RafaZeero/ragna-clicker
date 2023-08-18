import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { IconID } from '@shared/models';
import { map, ReplaySubject } from 'rxjs';

const getIconURL = (iconID: IconID): string => `/assets/icons/${iconID}.svg#icon`;

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'rag-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * !IMPORTANT: A `svg` icon should ALWAYS be added following these criteria:
 *
 * 1. A `id` attribute with the value `icon`.
 * 2. A `viewBox` attribute with the value `0 0 20 20`.
 * 3. A `width` attribute with the value 100%.
 * 4. A `height` attribute with the value 100%.
 * 5. A `fill` attribute with the value `var(--primary-icon-color)` (If there's
 *    more than one color, use `--secondary-icon-color` and so on).
 */
export class IconComponent {
  // Aria hidden is used to hide the icon from screen readers.
  @HostBinding('attr.aria-hidden') public readonly ariaHidden = true;

  private readonly _iconID$ = new ReplaySubject<IconID>(1);

  @Input({ required: true }) public set iconID(newIconID: IconID) {
    this._iconID$.next(newIconID);
  }

  public readonly iconID$ = this._iconID$.pipe(map(getIconURL));
}
