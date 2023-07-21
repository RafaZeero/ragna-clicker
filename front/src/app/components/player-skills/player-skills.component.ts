import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '@shared/models';
import { PlayerService } from '@shared/services';

@Component({
  selector: 'rag-player-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-skills.component.html',
  styleUrls: ['./player-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSkillsComponent {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;
}
