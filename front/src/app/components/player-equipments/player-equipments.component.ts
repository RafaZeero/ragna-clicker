import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';

@Component({
  selector: 'rag-player-equipments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-equipments.component.html',
  styleUrls: ['./player-equipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerEquipmentsComponent {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;
}
