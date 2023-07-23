import { ChangeDetectionStrategy, Component, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragEnd, Point } from '@angular/cdk/drag-drop';
import { HudService, PlayerService } from '@shared/services';
import { BehaviorSubject, map } from 'rxjs';
import { HudComponent, PlayerEquipmentsComponent } from '@components';
import { INITIAL_POSITION } from '@shared/constants';

@Component({
  selector: 'rag-hud-equipments',
  standalone: true,
  imports: [CommonModule, HudComponent, PlayerEquipmentsComponent],
  templateUrl: './hud-equipments.component.html',
  styleUrls: ['./hud-equipments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudEquipmentsComponent {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  public hudControl$ = this._hudService.hudControl$.pipe(map(huds => huds.equip));

  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.equip);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ equip }) => {
      // console.log({ attr });
      this._hudStartingPosition$.next(equip);
    });
  }
}
