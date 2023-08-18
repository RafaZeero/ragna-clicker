import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import type { ICON_ID } from '@core-ui/constants';
import { IconComponent } from '../icon';

type FormAlertIcon = typeof ICON_ID.info | typeof ICON_ID.lock;

@Component({
  selector: 'uv-form-alert',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './form-alert.component.html',
  styleUrls: ['./form-alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormAlertComponent {
  @Input({ required: true })
  public textAlert!: string;

  @Input()
  public themeColor: 'red' | 'orange' = 'red';

  @Input()
  public icon: FormAlertIcon = 'info';
}
