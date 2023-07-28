import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from '@shared/services';
import { Observable, map, shareReplay } from 'rxjs';
import { NoviceSkillsName, Player, UpgradableBySkills } from '@shared/models';
import { skillEffectAlias } from '@shared/constants';

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

  public player$: Observable<Player> = this._playerService.player$;
  public skills$: Observable<Player['skills']> = this.player$.pipe(
    map(player => player.skills),
    shareReplay(),
  );

  public ngOnInit(): void {}

  public levelUpSKill(skill: NoviceSkillsName) {
    this._playerService.addOnePointToSkill(skill);
  }

  public skillMapping(playerClass: Player['class'], upgrade: UpgradableBySkills) {
    return skillEffectAlias[playerClass]![upgrade];
  }

  public trackBySkill = (index: number): number => index;
}
