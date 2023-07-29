import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, GameMechanicsService, PlayerService } from '@shared/services';
import { map } from 'rxjs';

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
  private readonly _api = inject(ApiService);

  public player$ = this._playerService.player$;
  public effectsVolume$ = this._gameMechanics.config$.pipe(map(config => config.audio.effectsVolume * 100));
  public gameMusicVolume$ = this._gameMechanics.config$.pipe(map(config => config.audio.gameMusicVolume * 100));

  public setGameVolume(event: Event) {
    const volume = parseInt((event.target as HTMLInputElement).value) / 100;

    // Adjust game music volume
    this._gameMechanics.gameSounds.gameMusic.setVolume(volume);

    // Improve this to do not call on every change
    this._api.saveConfig({
      audio: { gameMusicVolume: volume, effectsVolume: this._gameMechanics.config.audio.effectsVolume },
    });
  }

  public setEffectsVolume(event: Event) {
    const volume = parseInt((event.target as HTMLInputElement).value) / 100;

    // Adjust sound effects volume
    this._gameMechanics.gameSounds.effects.setVolume(volume);

    // Improve this to do not call on every change
    this._api.saveConfig({
      audio: { effectsVolume: volume, gameMusicVolume: this._gameMechanics.config.audio.gameMusicVolume },
    });
  }

  public play = () => {
    this._gameMechanics.gameSounds.gameMusic.pauseAudio('streamside');
    this._gameMechanics.gameSounds.gameMusic.playAudio('streamside');
  };
  public pause = () => {
    this._gameMechanics.gameSounds.gameMusic.pauseAudio('streamside');
  };
}
