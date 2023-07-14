import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ApiService } from '@shared/services';
import MapComponent from '../../components/map/map.component';
import { Maps } from '@shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  NEVER,
  Subject,
  combineLatestWith,
  delay,
  exhaustMap,
  filter,
  first,
  iif,
  last,
  map,
  of,
  share,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';

type Player = {
  attributes: {
    strength: number;
  };
  stats: {
    damage: {
      base: number;
      weapon: number;
    };
  };
  exp: {
    current: {
      base: number;
      job: number;
    };
    toLevelUp: {
      base: number;
      job: number;
    };
  };
  level: number;
};
@Component({
  standalone: true,
  selector: 'rag-home',
  imports: [CommonModule, MapComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomeComponent implements OnInit {
  private readonly _api = inject(ApiService);
  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);

  public image!: string;

  public currentMap: Maps = 'prontera-south';
  public monsterData = {
    life: 100,
  };

  private _life$ = new BehaviorSubject<number>(this.monsterData.life);
  public life$ = this._life$.asObservable();
  // public life$ = new Subject<number>();

  private _showMonster$ = new BehaviorSubject<boolean>(true);
  public showMonster$ = this._showMonster$.asObservable();

  public loadMonster$ = this.life$.pipe(
    // Map current life
    map(currentLife => currentLife > 0),
  );

  public reloadMonster$ = this.loadMonster$.pipe(
    filter(data => !data),
    delay(500),
  );

  public player$ = new BehaviorSubject<Player>({
    attributes: {
      strength: 3,
    },
    level: 1,
    exp: {
      current: { base: 0, job: 0 },
      toLevelUp: { base: 0, job: 0 },
    },
    stats: {
      damage: {
        base: 13,
        weapon: 0,
      },
    },
  });

  public get player() {
    return this.player$.value;
  }

  public ngOnInit(): void {
    this._api.getImage(1002).subscribe(data => {
      this.image = data;
      this._cd.detectChanges();
    });

    this.reloadMonster$.subscribe(this.giveExp);
  }

  public attack() {
    const currentLife = this._life$.value;
    const damageDealt = this.player$.value.stats.damage.base + this.player$.value.stats.damage.base;

    if (currentLife > 0) {
      console.log('damageDealt: ', damageDealt);
      this._life$.next(currentLife - damageDealt);
    }
  }

  public setWeaponDamage(player: Player, weaponDamage: number) {
    // Remove any damage from previous weapon
    this.unequipPreviousWeapon();
    // Calculate new weapon damage
    const newWeaponDamage = this.calculateDamage(player, weaponDamage);
    const previousPlayerDamages = player.stats.damage;
    // Update player damage
    this.player$.next({ ...player, stats: { damage: { ...previousPlayerDamages, weapon: newWeaponDamage } } });
    return newWeaponDamage;
  }

  public unequipPreviousWeapon() {
    const player = this.player$.value;
    const previousPlayerDamages = player.stats.damage;
    this.player$.next({ ...player, stats: { damage: { ...previousPlayerDamages, weapon: 0 } } });
  }

  // Move to utils
  private calculateDamage(player: Player, weaponDamage: number) {
    // Add weaponType & weaponRefine to calc
    const damage = player.attributes.strength * 2 + weaponDamage;

    return damage;
  }

  // Move to utils
  private giveExp = () => {
    console.log('exp!!');
    // Get exp
    this.player$.next({
      ...this.player$.value,
      exp: {
        ...this.player$.value.exp,
        current: { base: this.player$.value.exp.current.base + 10, job: this.player$.value.exp.current.job + 7 },
      },
    });

    // New monster
    this._life$.next(100);
    console.log('live again !!');
  };
}
