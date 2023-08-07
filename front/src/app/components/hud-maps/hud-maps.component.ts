import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent } from '../hud/hud.component';
import { HudService, PlayerService } from '@shared/services';
import { Point } from '@angular/cdk/drag-drop';
import { INITIAL_POSITION } from '@shared/constants';
import { map, BehaviorSubject } from 'rxjs';
import { MapSelectionComponent } from '../map-selection';
import { ButtonRoundedComponent } from '../button-rounded';

@Component({
  selector: 'rag-hud-maps',
  standalone: true,
  imports: [CommonModule, HudComponent, MapSelectionComponent, ButtonRoundedComponent],
  templateUrl: './hud-maps.component.html',
  styleUrls: ['./hud-maps.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudMapsComponent implements OnInit {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  public hudControl$ = this._hudService.hudControl$.pipe(map(huds => huds.maps));

  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.maps);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ maps: map }) => {
      this._hudStartingPosition$.next(map);
    });
  }

  // Close this Hud
  public close(): void {
    this._hudService.controlPlayerHud('maps');
  }
}
