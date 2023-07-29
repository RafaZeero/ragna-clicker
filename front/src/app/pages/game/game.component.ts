import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HudInfoComponent,
  HudAttributesComponent,
  MapComponent,
  ResetComponent,
  MonsterComponent,
  HudEquipmentsComponent,
  HudConfigComponent,
} from '@components';
import { GameMaps } from '@shared/models';
import { ApiService, GameMechanicsService, HudService, MonsterService } from '@shared/services';
import { Observable, of } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { HudSkillsComponent } from 'src/app/components/hud-skills/hud-skills.component';
import { HitboxDirective } from '@shared/directives';

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

  public showDebugger = environment.debugger;
  public image$!: Observable<string>;
  public loadMonster$ = this._monsterService.loadMonster$;

  // Mocked data
  public currentMap: GameMaps = 'prontera-south';

  public async ngOnInit(): Promise<void> {
    Promise.all([
      // Load player from db
      await this._loadPlayer(),
      // Load config from db
      await this._loadConfig(),
    ]);
    // Load monster image to show on map
    this._loadMonsterImage();

    // Reload monster after it dies
    this._monsterService.reloadMonster().subscribe(this.giveRewards);

    this._gameMechanicsService.gameSounds.gameMusic.playAudio('streamside');
  }

  // Basic click attack
  public attack(event: MouseEvent) {
    const hitboxRef = this.hitbox.viewContainerRef;

    this._gameMechanicsService.attack(event, hitboxRef);
  }

  // Move to utils
  private giveRewards = () => {
    this._gameMechanicsService.giveRewards();
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
    this._gameMechanicsService.loadPlayer();
  }

  // Load config from db
  private async _loadConfig() {
    this._gameMechanicsService.loadConfig();
  }

  public resetAllHudsPositioning() {
    this._hudService.resetHudPosition();
  }
}
