import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { first, map, shareReplay } from 'rxjs';

@Component({
  selector: 'rag-player-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-skills.component.html',
  styleUrls: ['./player-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerSkillsComponent implements OnInit {
  @Input({ required: true }) public mode: 'complete' | 'compact' = 'complete';

  private readonly _playerService = inject(PlayerService);

  public player$ = this._playerService.player$;
  public skills$ = this.player$.pipe(
    map(player => player.skills),
    shareReplay(),
  );

  public ngOnInit(): void {}
}
