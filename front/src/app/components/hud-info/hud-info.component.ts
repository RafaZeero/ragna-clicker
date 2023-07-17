import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent } from '../hud/hud.component';
import { PlayerComponent } from '../player';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PlayerService } from '@shared/services';

@Component({
  selector: 'rag-hud-info',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerComponent],
  templateUrl: './hud-info.component.html',
  styleUrls: ['./hud-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudInfoComponent {
  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;

  @Input({ required: true }) public game!: HTMLElement;
}
