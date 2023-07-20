import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rag-hud-equipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hud-equipments.component.html',
  styleUrls: ['./hud-equipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudEquipmentsComponent {}
