import { Injectable, inject } from '@angular/core';
import { Attributes, MonsterData, Player } from '@shared/models';
import { GameMechanicsService } from '../game-mechanics';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly _gameMechanicsService = inject(GameMechanicsService);

  public player$: Observable<Player> = this._gameMechanicsService.player$;

  public checkLevelUp(): void {
    this._gameMechanicsService.checkLevelUp();
  }

  public gainExp(monsterExp: MonsterData['exp']): void {
    this._gameMechanicsService.gainExp(monsterExp);
  }

  public addOnePointToAttribute(attribute: keyof Attributes): void {
    this._gameMechanicsService.addOnePointToAttribute(attribute);
  }

  public addOnePointToSkill(skill: keyof Player['skills']['passive']): void {
    this._gameMechanicsService.addOnePointToSkill(skill);
  }

  public reset() {
    this._gameMechanicsService.debug().resetPlayer();
  }

  // There is a bug in this Debugger, EXP is not updating. Since it is just a debugger, I don't care hehe
  public levelUpBase() {
    this._gameMechanicsService.levelUpBase();
  }

  // There is a bug in this Debugger, EXP is not updating. Since it is just a debugger, I don't care hehe
  public levelUpJob() {
    this._gameMechanicsService.levelUpJob();
  }
}
