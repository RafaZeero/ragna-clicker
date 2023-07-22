import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudService, PlayerService } from '@shared/services';
import { Experience, HudControl } from '@shared/models';

@Component({
  selector: 'rag-player-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  public player$ = this._playerService.player$;
  public levelTypes: Array<keyof Experience> = ['base', 'job'];

  public toggleOnePlayerHud(toggleHud: keyof Partial<HudControl>) {
    // Toggle Open/Close hud
    this._hudService.controlPlayerHud(toggleHud);
  }
}
