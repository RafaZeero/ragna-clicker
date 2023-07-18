import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudInfoComponent, HudAttributesComponent, MapComponent } from '@components';
import { Maps, MonsterData } from '@shared/models';
import { ApiService, PlayerService } from '@shared/services';
import { Observable, BehaviorSubject, map, filter, delay, of } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, MapComponent, HudInfoComponent, HudAttributesComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GameComponent implements OnInit {
  private readonly _api = inject(ApiService);
  private readonly _playerService = inject(PlayerService);
  private readonly _cd = inject(ChangeDetectorRef);

  public image$!: Observable<string>;

  // Mocked data
  public currentMap: Maps = 'prontera-south';
  public monsterData: MonsterData = {
    life: 10,
    id: 10002,
    exp: {
      base: 90,
      job: 28,
    },
  };

  // streams
  private _life$ = new BehaviorSubject<number>(this.monsterData.life);
  public life$ = this._life$.asObservable();

  public loadMonster$ = this.life$.pipe(
    // Map monster current life
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
    // // Get exp
    this._playerService.gainExp(this.monsterData.exp);

    // Check if player has leveled up
    this._playerService.checkLevelUp();

    // New monster
    this._life$.next(this.monsterData.life);
  };
}
