import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, delay, filter, map } from 'rxjs';
import { MonsterData } from '@shared/models';

// Mocked monster
const poring: MonsterData = {
  hp: 60,
  id: 10002,
  exp: {
    base: 72,
    job: 40,
  },
};

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  // Request from API, monster will change on the map
  public monsterData: MonsterData = poring;

  // Streams
  private _monster$ = new BehaviorSubject<MonsterData>(this.monsterData);
  public monster$ = this._monster$.asObservable();

  private _hp$ = new BehaviorSubject<number>(this.monsterData.hp);
  public hp$ = this._hp$.asObservable();

  public monsterLifeBar$ = combineLatest({
    currentHP: this.hp$,
    monsterData: this.monster$,
  }).pipe(map(({ currentHP, monsterData: { hp: totalHP } }) => (currentHP / totalHP) * 100));

  // Current monster hp
  public get currentHP() {
    return this._hp$.getValue();
  }

  // Current monster data
  public get currentMonster() {
    return this._monster$.getValue();
  }

  public loadMonster$ = this.hp$.pipe(
    // Map monster current life
    map(currentHP => currentHP > 0),
  );

  // Damage monster
  public makeDamageToMonster(damageTaken: number): void {
    const currentHP = this._hp$.value;

    // Only do damage if there is hp
    if (currentHP > 0) {
      this._hp$.next(currentHP - damageTaken);
    }
  }

  // Reload monster after it dies
  public reloadMonster(): Observable<boolean> {
    return this.loadMonster$.pipe(
      filter(isAlive => !isAlive),
      // reload after 350 ms
      delay(350),
    );
  }

  // Recover monster hp
  public updateMonster(): void {
    // TODO: random choose next monster
    const totalHP = this._monster$.getValue().hp;
    this._hp$.next(totalHP);
  }
}
