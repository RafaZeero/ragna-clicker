import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import {
  HudInfoComponent,
  HudAttributesComponent,
  MapComponent,
  ResetComponent,
  MonsterComponent,
  HudEquipmentsComponent,
  HudConfigComponent,
  HudMapsComponent,
} from '@components';
import { ApiService, GameMechanicsService, HudService, MapService, MonsterService } from '@shared/services';
import { Observable, firstValueFrom, interval, map, of, switchMap } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HudSkillsComponent } from 'src/app/components/hud-skills/hud-skills.component';
import { HitboxDirective } from '@shared/directives';
import { monstersInMap } from '@shared/utils';
import { find } from 'lodash';
import * as O from 'fp-ts/lib/Option';
import { MonsterResponseFromAPI } from '@shared/models';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    HudInfoComponent,
    HudAttributesComponent,
    HudEquipmentsComponent,
    HudSkillsComponent,
    HudConfigComponent,
    HudMapsComponent,
    MonsterComponent,
    HitboxDirective,
    ResetComponent,
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GameComponent implements OnInit {
  @ViewChild(HitboxDirective) public hitbox!: HitboxDirective;

  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _api = inject(ApiService);
  private readonly _monsterService = inject(MonsterService);
  private readonly _hudService = inject(HudService);
  private readonly _gameMechanicsService = inject(GameMechanicsService);
  private readonly _mapService = inject(MapService);

  public showDebugger = environment.debugger;
  public image$!: Observable<string>;
  public loadMonster$ = this._monsterService.loadMonster$;
  public autoAttack$ = interval(5000).pipe(
    takeUntilDestroyed(),
    switchMap(() =>
      this._gameMechanicsService.player$.pipe(
        // TODO: improve this to get remainders of 10 & reborn buff
        map(player => (player.attributes.values.agility >= 10 ? this.autoAttack() : false)),
      ),
    ),
  );

  // Mocked data
  public currentMap$ = this._mapService.currentMap$;

  @ViewChild('monster') public monsterRef!: MonsterComponent;
  public autoAttack() {
    const monster = this.monsterRef?.element.nativeElement as HTMLElement;
    // Check if monster is alive to click on it
    if (monster) {
      monster.click();
    }
  }

  public async ngOnInit(): Promise<void> {
    Promise.all([
      // Load player from db
      await this._loadPlayer(),
      // Load config from db
      await this._loadConfig(),
      // Load monster image to show on map
      await this._loadMonster(),
    ]);

    // Reload monster after it dies
    this._monsterService.reloadMonster().subscribe(() => {
      this._loadMonster();
    });

    this._gameMechanicsService.gameSounds.gameMusic.playAudio('streamside');

    // Auto attack
    // this.autoAttack$.subscribe();
  }

  // Basic click attack
  public attack(event: MouseEvent) {
    const hitboxRef = this.hitbox.viewContainerRef;

    this._gameMechanicsService.attack(event, hitboxRef);
  }

  // Load monster image to show on map
  private async _loadMonster() {
    // Get current map name
    const map = await firstValueFrom(this.currentMap$);

    // Get a monster list given current map
    const monsters = monstersInMap[map];

    // Get a random monster from the monster list
    const randomMonster = monsters[Math.floor(Math.random() * monsters.length)];

    // Get list of monsters that already had request for API
    const monstersAlreadyRequested = await firstValueFrom(this._monsterService.allMonstersRequested$);

    // Find if monster is in list
    const monsterMaybe = O.fromNullable(
      find(monstersAlreadyRequested, monster => monster.monsterData.id === randomMonster),
    );

    // Check if monster is already saved locally
    if (O.isSome(monsterMaybe)) {
      // Update monster values
      this._updateMonsterValues(monsterMaybe.value);
      return;
    }

    // Get in API the monster data
    const monsterDataFromAPI = await firstValueFrom(this._api.getMonster(randomMonster));

    // Create new list with updated monster
    const updatedMonstersAlreadyRequested = [...monstersAlreadyRequested, monsterDataFromAPI];

    // Update list with all monsters that were requested to avoid second unnecessary request
    this._gameMechanicsService.monstersRequested = updatedMonstersAlreadyRequested;

    // Update monster values
    this._updateMonsterValues(monsterDataFromAPI);
  }

  // Load player from db
  private async _loadPlayer() {
    this._gameMechanicsService.loadPlayer();
  }

  // Load config from db
  private async _loadConfig() {
    this._gameMechanicsService.loadConfig();
  }

  // Monster values update
  private _updateMonsterValues(monster: MonsterResponseFromAPI['response']): void {
    // Assign monster image data to the image
    this.image$ = of(monster.monsterImage);

    // Assign monster data to the currentMonster stream
    this._gameMechanicsService.currentMonster = monster.monsterData;

    // Assign monster hp data to the currentMonsterHP stream
    this._gameMechanicsService.currentHP = monster.monsterData.stats.hp;
    this._cd.detectChanges();
  }

  public resetAllHudsPositioning() {
    this._hudService.resetHudPosition();
  }
}
