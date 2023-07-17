import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent } from '../hud/hud.component';
import { PlayerComponent } from '../player';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rag-hud-info',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerComponent],
  templateUrl: './hud-info.component.html',
  styleUrls: ['./hud-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudInfoComponent {
  @Input({ required: true }) public game!: HTMLElement;
}
