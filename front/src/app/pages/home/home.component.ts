import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ApiService, PlayerService } from '@shared/services';
import MapComponent from '../../components/map/map.component';
import { Maps, Player } from '@shared/models';
import { BehaviorSubject, Observable, delay, filter, map, of } from 'rxjs';

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
  private readonly _playerService = inject(PlayerService);
  private readonly _cd = inject(ChangeDetectorRef);

  public image$!: Observable<string>;

  // Mocked data
  public currentMap: Maps = 'prontera-south';
  public monsterData = {
    life: 100,
    id: 10002,
    exp: {
      base: 10,
      job: 7,
    },
  };

  // streams
  private _life$ = new BehaviorSubject<number>(this.monsterData.life);
  public life$ = this._life$.asObservable();

  public loadMonster$ = this.life$.pipe(
    // Map current life
    map(currentLife => currentLife > 0),
  );

  // Reload monster after it dies
  public reloadMonster$ = this.loadMonster$.pipe(
    filter(data => !data),
    // reload after 500 ms
    delay(350),
  );

  public ngOnInit(): void {
    this._api.getImage(1002).subscribe(data => {
      // This way the empty image will not appear
      this.image$ = of(data);
      this._cd.detectChanges();
    });

    // Reload monster after it dies
    this.reloadMonster$.subscribe(this.giveExp);
  }

  public attack() {
    const currentLife = this._life$.value;
    const damageDealt = this._playerService.calculateDamageDealt();

    // Only do damage if there is hp
    if (currentLife > 0) {
      console.log('damageDealt: ', damageDealt);
      this._life$.next(currentLife - damageDealt);
    }
  }

  // Move to utils
  private giveExp = () => {
    console.log('exp!!');
    // Get exp
    this._playerService.player = {
      ...this._playerService.player,
      exp: {
        ...this._playerService.player.exp,
        current: {
          base: this._playerService.player.exp.current.base + this.monsterData.exp.base,
          job: this._playerService.player.exp.current.job + this.monsterData.exp.job,
        },
      },
    };

    this._playerService.checkLevelUp();

    // New monster
    this._life$.next(100);
    console.log('live again !!');
  };
}
