import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, delay, filter, map } from 'rxjs';
import { MonsterData } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class MonsterService {
  public monsterData: MonsterData = {
    life: 60,
    id: 10002,
    exp: {
      base: 72,
      job: 40,
    },
  };

  // streams
  private _monster$ = new BehaviorSubject<MonsterData>(this.monsterData);
  public monster$ = this._monster$.asObservable();

  private _life$ = new BehaviorSubject<number>(this.monsterData.life);
  public life$ = this._life$.asObservable();

  public monsterLifeBar$ = combineLatest({
    currentHP: this.life$,
    monsterData: this.monster$,
  }).pipe(map(({ currentHP, monsterData: { life: totalHP } }) => (currentHP / totalHP) * 100));

  // Current monster hp
  public get currentLife() {
    return this._life$.getValue();
  }

  // Current monster data
  public get currentMonster() {
    return this._monster$.getValue();
  }

  // Life bar

  public loadMonster$ = this.life$.pipe(
    // Map monster current life
    map(currentLife => currentLife > 0),
  );

  // Damage monster
  public makeDamageToMonster(damage: number): void {
    const currentLife = this._life$.value;

    // Only do damage if there is hp
    if (currentLife > 0) {
      console.log('damageDealt: ', damage);
      this._life$.next(currentLife - damage);
    }
  }

  // Reload monster after it dies
  public reloadMonster(): Observable<boolean> {
    return this.loadMonster$.pipe(
      filter(data => !data),
      // reload after 350 ms
      delay(350),
    );
  }

  // Recover monster life
  public updateMonster(): void {
    // TODO: random choose next monster
    const totalHP = this._monster$.getValue().life;
    this._life$.next(totalHP);
  }
}
