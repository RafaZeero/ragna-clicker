import { ChangeDetectionStrategy, Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudService, PlayerService } from '@shared/services';
import { Experience, HudControl } from '@shared/models';
import { MAX_LEVEL } from '@shared/constants';

@Component({
  selector: 'rag-player-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-info.component.html',
  styleUrls: ['./player-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerInfoComponent implements OnInit {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  public maxLevel = MAX_LEVEL;

  public username: string | null = null;
  public player$ = this._playerService.player$;
  public levelTypes: Array<keyof Experience> = ['base', 'job'];

  public toggleOnePlayerHud(toggleHud: keyof Partial<HudControl>) {
    // Toggle Open/Close hud
    this._hudService.controlPlayerHud(toggleHud);
  }

  public ngOnInit(): void {
    this.getUsername();
  }

  public getUsername() {
    const username = localStorage.getItem('userLogged');
    if (!username) return;

    this.username = username;
  }
}
