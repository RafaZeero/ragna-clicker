import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { Observable, first, map, shareReplay, tap } from 'rxjs';
import { NoviceSkillsName, Player } from '@shared/models';

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
  public skills$: Observable<Player['skills']> = this.player$.pipe(
    map(player => player.skills),
    shareReplay(),
  );

  public ngOnInit(): void {}

  public uparSKill(skill: NoviceSkillsName) {
    // TODO
    console.log(`skill ${skill} subiu de nível!`);
    // this._playerService.addOnePointToSkill(skill);
  }
}
