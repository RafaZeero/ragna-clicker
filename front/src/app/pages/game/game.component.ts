import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudInfoComponent, HudAttributesComponent, MapComponent, ResetComponent } from '@components';
import { Maps, MonsterData } from '@shared/models';
import { ApiService, MonsterService, PlayerService } from '@shared/services';
import { Observable, BehaviorSubject, map, filter, delay, of, combineLatest, tap } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, MapComponent, HudInfoComponent, HudAttributesComponent, ResetComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GameComponent implements OnInit {
  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _api = inject(ApiService);
  private readonly _playerService = inject(PlayerService);
  private readonly _monsterService = inject(MonsterService);

  public image$!: Observable<string>;
  public loadMonster$ = this._monsterService.loadMonster$;
  public monsterHPBar$ = this._monsterService.monsterLifeBar$;

  // Mocked data
  public currentMap: Maps = 'prontera-south';

  public async ngOnInit(): Promise<void> {
    const playerFromLocalStorage = await this._api.getPlayer();

    if (playerFromLocalStorage) {
      console.log('player from local storage: ', playerFromLocalStorage);
      this._playerService.player = playerFromLocalStorage;
    } else {
      console.log('saving initial data to local storage');
      this._api.savePlayer(this._playerService.player);
    }

    this._api.getImage(1002).subscribe(data => {
      // This way the empty image will not appear
      this.image$ = of(data);
      this._cd.detectChanges();
    });

    // Reload monster after it dies
    this._monsterService.reloadMonster().subscribe(this.giveExp);

    const playerStats = this._playerService.updateStats();
    this._playerService.player = { ...this._playerService.player, stats: playerStats };
  }

  // Basic click attack
  public attack() {
    const damageDealt = this._playerService.calculateDamageDealt();

    this._monsterService.makeDamageToMonster(damageDealt);
  }

  // Move to utils
  private giveExp = () => {
    // // Get exp
    this._playerService.gainExp(this._monsterService.currentMonster.exp);

    // Check if player has leveled up
    this._playerService.checkLevelUp();

    // New monster
    this._monsterService.updateMonster();
  };
}
