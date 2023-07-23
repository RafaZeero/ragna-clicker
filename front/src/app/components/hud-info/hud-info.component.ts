import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HudComponent, PlayerInfoComponent } from '@components';
import { DragDropModule, Point } from '@angular/cdk/drag-drop';
import { HudService, PlayerService } from '@shared/services';
import { BehaviorSubject, Observable } from 'rxjs';
import { INITIAL_POSITION } from '@shared/constants';

@Component({
  selector: 'rag-hud-info',
  standalone: true,
  imports: [CommonModule, DragDropModule, HudComponent, PlayerInfoComponent],
  templateUrl: './hud-info.component.html',
  styleUrls: ['./hud-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HudInfoComponent implements OnInit {
  @Input({ required: true }) public game!: HTMLElement;

  // Dependency Injections
  private readonly _playerService = inject(PlayerService);
  private readonly _hudService = inject(HudService);

  // Streams
  public player$ = this._playerService.player$;
  private _hudStartingPosition$ = new BehaviorSubject<Point>(INITIAL_POSITION.info);
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Variables
  public hudStartingPosition!: Point;

  //Functions
  public ngOnInit(): void {
    this._hudService.saveHudPositioning$.subscribe(({ info }) => {
      // console.log({ attr });
      this._hudStartingPosition$.next(info);
    });
  }
}
