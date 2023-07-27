import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameMechanicsService, PlayerService } from '@shared/services';

@Component({
  selector: 'rag-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigComponent {
  private readonly _playerService = inject(PlayerService);
  private readonly _gameMechanics = inject(GameMechanicsService);

  public player$ = this._playerService.player$;

  public setGameVolume(event: Event) {
    const volume = parseInt((event.target as HTMLInputElement).value) / 100;

    // Adjust game music volume
    this._gameMechanics.gameSounds.gameMusic.setVolume(volume);
  }

  public setEffectsVolume(event: Event) {
    const volume = parseInt((event.target as HTMLInputElement).value) / 100;

    // Adjust sound effects volume
    this._gameMechanics.gameSounds.effects.setVolume(volume);
  }
}
