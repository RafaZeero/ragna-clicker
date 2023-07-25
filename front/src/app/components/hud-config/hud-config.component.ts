import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-hud-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-config.component.html',
  styleUrls: ['./hud-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HudConfigComponent {

}
