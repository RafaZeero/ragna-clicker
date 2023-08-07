import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-hud-char',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-char.component.html',
  styleUrls: ['./hud-char.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HudCharComponent {

}
