import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent } from '../hud/hud.component';
import { Point } from '@angular/cdk/drag-drop';
import { INITIAL_POSITION } from '@shared/constants';
import { PlayerService, HudService } from '@shared/services';
import { map, BehaviorSubject } from 'rxjs';
import { ConfigComponent } from '../config';
import { ButtonRoundedComponent } from '../button-rounded';

@Component({
  selector: 'rag-hud-config',
  standalone: true,
  imports: [CommonModule, HudComponent, ConfigComponent, ButtonRoundedComponent],
  templateUrl: './hud-config.component.html',
  styleUrls: ['./hud-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudConfigComponent {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  public hudControl$ = this._hudService.hudControl$.pipe(map(huds => huds.config));

  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.config);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ config }) => {
      this._hudStartingPosition$.next(config);
    });
  }

  // Close this Hud
  public close(): void {
    this._hudService.controlPlayerHud('config');
  }
}
