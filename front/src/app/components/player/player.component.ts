import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';

@Component({
  selector: 'rag-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;
}
