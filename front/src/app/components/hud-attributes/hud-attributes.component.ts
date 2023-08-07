import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent, PlayerAttributesComponent } from '@components';
import { DragDropModule, Point } from '@angular/cdk/drag-drop';
import { HudService, PlayerService } from '@shared/services';
import { BehaviorSubject, map } from 'rxjs';
import { INITIAL_POSITION } from '@shared/constants';
import { ButtonRoundedComponent } from '../button-rounded';

@Component({
  selector: 'rag-hud-attributes',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerAttributesComponent, ButtonRoundedComponent],
  templateUrl: './hud-attributes.component.html',
  styleUrls: ['./hud-attributes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudAttributesComponent {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  public hudControl$ = this._hudService.hudControl$.pipe(map(huds => huds.attr));

  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.attr);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ attr }) => {
      // console.log({ attr });
      this._hudStartingPosition$.next(attr);
    });
  }

  // Close this Hud
  public close(): void {
    this._hudService.controlPlayerHud('attr');
  }
}
