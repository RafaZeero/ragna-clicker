import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { playSound } from '@shared/utils';

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

  public player$ = this._playerService.player$;

  public sound = playSound;

  public setGameVolume(event: Event) {
    const volume = parseInt((event.target as HTMLInputElement).value) / 100;

    // this.sound.levelUp.set(volume);

    console.log({ event: (event.target as HTMLInputElement).value });
  }

  public setEffectsVolume(event: Event) {
    const volume = parseInt((event.target as HTMLInputElement).value) / 100;

    this.sound.effects.set(volume);

    console.log({ event: (event.target as HTMLInputElement).value });
  }
}
