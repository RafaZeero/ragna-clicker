import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Point } from '@angular/cdk/drag-drop';
import { PlayerService } from '@shared/services';
import { BehaviorSubject } from 'rxjs';
import { HudComponent, PlayerEquipmentsComponent } from '@components';

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

  // Streams
  public player$ = this._playerService.player$;
  private _hudStartingPosition$ = new BehaviorSubject<Point>({ x: 0, y: 0 });
  public hudStartingPosition$ = this._hudStartingPosition$.asObservable();

  // Variables
  public hudStartingPosition!: Point;

  // Functions
  public ngOnInit(): void {
    this._hudStartingPosition$.next({ x: 0, y: 367 });
    this.hudStartingPosition = this._hudStartingPosition$.value;
  }
}
