import { Injectable, ViewContainerRef, inject } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, delay, filter, map } from 'rxjs';
import { MonsterData } from '@shared/models';
import { GameMechanicsService } from '../game-mechanics';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  private readonly _gameMechanics = inject(GameMechanicsService);

  // Request from API, monster will change on the map
  public monsterData: MonsterData = this._gameMechanics.monsterData;

  // Streams
  public monster$ = this._gameMechanics.monster$;
  public hp$ = this._gameMechanics.hp$;

  public monsterLifeBar$ = this._gameMechanics.monsterLifeBar$;

  // Current monster hp
  public get currentHP() {
    return this._gameMechanics.currentHP;
  }

  // Current monster data
  public get currentMonster() {
    return this._gameMechanics.currentMonster;
  }

  public loadMonster$ = this._gameMechanics.loadMonster$;

  // Damage monster
  public makeDamageToMonster(damage: number, event: MouseEvent, hitbox: ViewContainerRef): void {
    this._gameMechanics.makeDamageToMonster(damage, event, hitbox);
  }

  // Reload monster after it dies
  public reloadMonster(): Observable<boolean> {
    return this._gameMechanics.reloadMonster();
  }

  // Recover monster hp
  public updateMonster(): void {
    this._gameMechanics.updateMonster();
  }
}
