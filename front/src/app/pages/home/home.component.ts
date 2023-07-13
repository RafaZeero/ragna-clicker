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
  filter,
  first,
  map,
  of,
  share,
  shareReplay,
  take,
  takeUntil,
  tap,
} from 'rxjs';

type Player = {
  damage: number;
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

  public life$ = new BehaviorSubject<number>(100);

  public loadMonster$ = this.life$.pipe(
    takeUntilDestroyed(this._destroyRef),
    map(currentLife => currentLife > 0),
  );

  public reloadMonster$ = this.loadMonster$.pipe(
    filter(data => !data),
    delay(500),
    tap(() => {
      // Get exp
      this.player$.next({
        ...this.player$.value,
        exp: {
          ...this.player$.value.exp,
          current: { base: this.player$.value.exp.current.base + 10, job: this.player$.value.exp.current.job + 7 },
        },
      });

      // New monster
      this.life$.next(100);
    }),
  );

  public player$ = new BehaviorSubject<Player>({
    damage: 25,
    level: 1,
    exp: {
      current: { base: 0, job: 0 },
      toLevelUp: { base: 0, job: 0 },
    },
  });

  public ngOnInit(): void {
    this._api.getImage(1002).subscribe(data => {
      this.image = data;
      this._cd.detectChanges();
    });

    this.reloadMonster$.subscribe();
  }

  public attack() {
    const currentLife = this.life$.value;
    const playerDamage = this.player$.value.damage;

    if (currentLife > 0) this.life$.next(currentLife - playerDamage);
  }
}
