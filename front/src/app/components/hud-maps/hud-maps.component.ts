import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-hud-maps',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-maps.component.html',
  styleUrls: ['./hud-maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudMapsComponent {}
