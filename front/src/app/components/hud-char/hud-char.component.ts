import { ChangeDetectionStrategy, Component, Input, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerCharComponent } from '../player-char';
import { HudService, PlayerService } from '@shared/services';
import { Point } from '@angular/cdk/drag-drop';
import { INITIAL_POSITION } from '@shared/constants';
import { map, BehaviorSubject } from 'rxjs';
import { ButtonRoundedComponent } from '../button-rounded';
import { HudComponent } from '../hud/hud.component';

@Component({
  selector: 'rag-hud-char',
  standalone: true,
  imports: [CommonModule, HudComponent, PlayerCharComponent, ButtonRoundedComponent],
  templateUrl: './hud-char.component.html',
  styleUrls: ['./hud-char.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudCharComponent {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  public hudControl$ = this._hudService.hudControl$.pipe(map(huds => huds.char));

  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.char);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ char }) => {
      this._hudStartingPosition$.next(char);
    });
  }

  // Close this Hud
  public close(): void {
    this._hudService.controlPlayerHud('char');
  }
}
