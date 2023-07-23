import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from '@angular/cdk/drag-drop';
import { HudService, PlayerService } from '@shared/services';
import { BehaviorSubject, map } from 'rxjs';
import { HudComponent } from '../hud/hud.component';
import { PlayerSkillsComponent } from '../player-skills';
import { INITIAL_POSITION } from '@shared/constants';

@Component({
  selector: 'rag-hud-skills',
  standalone: true,
  imports: [CommonModule, HudComponent, PlayerSkillsComponent],
  templateUrl: './hud-skills.component.html',
  styleUrls: ['./hud-skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudSkillsComponent {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  public hudControl$ = this._hudService.hudControl$.pipe(map(huds => huds.skills));
  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.skills);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  //Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ skills }) => {
      // console.log({ attr });
      this._hudStartingPosition$.next(skills);
    });
  }
}
