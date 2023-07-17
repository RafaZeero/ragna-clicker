import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { Experience } from '@shared/models';

@Component({
  selector: 'rag-player-attributes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-attributes.component.html',
  styleUrls: ['./player-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerAttributesComponent {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;
  public levelTypes: Array<keyof Experience> = ['base', 'job'];
}
