import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HudInfoComponent,
  HudAttributesComponent,
  MapComponent,
  ResetComponent,
  MonsterComponent,
  HudEquipmentsComponent,
} from '@components';
import { Maps } from '@shared/models';
import { ApiService, HudService, MonsterService, PlayerService } from '@shared/services';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HudSkillsComponent } from 'src/app/components/hud-skills/hud-skills.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    HudInfoComponent,
    HudAttributesComponent,
    HudEquipmentsComponent,
    HudSkillsComponent,
    MonsterComponent,
    ResetComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GameComponent implements OnInit {
  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _api = inject(ApiService);
  private readonly _playerService = inject(PlayerService);
  private readonly _monsterService = inject(MonsterService);
  private readonly _hudService = inject(HudService);

  public showDebugger = environment.debugger;
  public image$!: Observable<string>;
  public loadMonster$ = this._monsterService.loadMonster$;

  // Mocked data
  public currentMap: Maps = 'prontera-south';

  public async ngOnInit(): Promise<void> {
    // Load player from db
    await this._loadPlayer();

    // Load monster image to show on map
    this._loadMonsterImage();

    // Reload monster after it dies
    this._monsterService.reloadMonster().subscribe(this.giveExp);
  }

  // Basic click attack
  public attack() {
    // Damage dealt to monster
    const damageDealt = this._playerService.calculateDamageDealt();

    // Reduce monster hp
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

  // Load monster image to show on map
  private _loadMonsterImage() {
    this._api.getImage(1002).subscribe(data => {
      // This way an empty square will not appear
      this.image$ = of(data);
      this._cd.detectChanges();
    });
  }

  // Load player from db
  private async _loadPlayer() {
    // TODO: change localstorage to db
    const playerInfoFromDB = await this._api.getPlayer();

    if (playerInfoFromDB) {
      console.log('player info [LOCAL_STORAGE]: ', playerInfoFromDB);
      this._playerService.player = playerInfoFromDB;
    } else {
      console.log('saving initial data [LOCAL_STORAGE]');
      this._api.savePlayer(this._playerService.player);
    }

    const playerStats = this._playerService.updateStats();
    this._playerService.player = { ...this._playerService.player, stats: playerStats };
  }

  public resetAllHudsPositioning() {
    this._hudService.resetHudPosition();
  }
}
